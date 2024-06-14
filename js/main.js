// 문서가 로드되면 컴퓨터 공학과 이수체계도 ce_cources.json 파일을 읽어서
// SVG 형식으로 도표를 그림
document.addEventListener('DOMContentLoaded', function() {

  // JSON 파일 로드
  fetch('/data/courses.json')// 상대경로를 절대경로로 변경
          // 파일을 가져오면 json 파일 형식으로 변환함
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok ' + response.statusText);
          }
          return response.json();
      })
      .then(courses => {
          // json 형식의 데이터가 전달되면 그림을 그림
          // 기존의 코드 문단을 별도의 함수로 분리
          drawSVGGraph(courses);
      })
      .catch(error => {
          console.error('Error loading JSON:', error);
          alert('Failed to load the JSON file. Please check the file path and try again.');
      });
  
    });


// 전달된 이수체계도 데이터를 SVG 형식으로 그림을 그림
function drawSVGGraph(courses) {
  const width = 2000;
  const height = 2000;
  const svg = d3.select('svg').attr('width', width).attr('height', height);

  // 학년, 학기별 그룹
  const groupedCourses = {};
  courses.forEach((course) => {
    const key = `${course.학년}-${course.학기}`;
    if (!groupedCourses[key]) {
      groupedCourses[key] = [];
    }
    groupedCourses[key].push(course);
  });

  // 노드 저장 배열
  const nodes = [];
  const links = [];

  let yOffset = 50;
  for (const [semester, courses] of Object.entries(groupedCourses)) {
    let xOffset = (width - (courses.length - 1) * 200) / 2;
    courses.forEach((course) => {
      nodes.push({
        name: course.과목명,
        x: xOffset,
        y: yOffset,
        prerequisites: course.선수과목 || [],
      });
      xOffset += 200; // 가로 간격
    });
    yOffset += 150; // 세로 간격
  }

  const nodeLookup = {};
  nodes.forEach((node) => {
    nodeLookup[node.name] = node;
  });

  // 조건에 따라 화살표
  nodes.forEach((node) => {
    node.prerequisites.forEach((prerequisite) => {
      if (nodeLookup[prerequisite]) {
        links.push({
          source: nodeLookup[prerequisite],
          target: node,
        });
      }
    });
  });

  svg
    .selectAll('.link')
    .data(links)
    .enter()
    .append('line')
    .attr('class', 'link')
    .attr('x1', (d) => d.source.x + 50)
    .attr('y1', (d) => d.source.y + 40) // 노드의 아래에서 시작
    .attr('x2', (d) => d.target.x + 50)
    .attr('y2', (d) => d.target.y) // 노드의 위에서 끝
    .attr('marker-end', 'url(#arrow)');

  // 노드 그리기
  const node = svg
    .selectAll('.node')
    .data(nodes)
    .enter()
    .append('g')
    .attr('class', 'node')
    .attr('transform', (d) => `translate(${d.x},${d.y})`);

  // 글씨가 보이도록 노드에 테두리만 설정
  node
    .append('rect')
    .attr('width', 185)
    .attr('height', 40)
    .attr('rx', 5)
    .attr('ry', 5)
    .attr('stroke', '#000')
    .attr('fill', 'none');

  node
    .append('text')
    .attr('dx', 10)
    .attr('dy', 25)
    .text((d) => d.name);

  // 화살표
  svg
    .append('defs')
    .append('marker')
    .attr('id', 'arrow')
    .attr('viewBox', '0 -5 10 10')
    .attr('refX', 5)
    .attr('refY', 0)
    .attr('markerWidth', 6)
    .attr('markerHeight', 6)
    .attr('orient', 'auto')
    .append('path')
    .attr('d', 'M0,-5L10,0L0,5')
    .attr('class', 'arrowHead');
}
// .catch((error) => console.error('Error loading courses:', error));
