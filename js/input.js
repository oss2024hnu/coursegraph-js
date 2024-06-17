document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('courseCanvas');
    const ctx = canvas.getContext('2d');

    // JSON 파일 로드
    fetch('input.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            drawGraph(data, ctx);
        })
        .catch(error => console.error('Error loading JSON:', error));
});

    
function drawGraph(data, ctx) {
    const yearGap = 400; // 각 학년 열 간의 수평 간격
    const verticalGap = 100; // 과목 간의 수직 간격
    const boxWidth = 300; // 박스 너비
    const boxHeight = 80; // 박스 높이

    // 캔버스 초기화
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    let columns = {};

    // 각 과목의 x, y 위치를 계산
    data.forEach(course => {
        if (!columns[course.year]) {
            columns[course.year] = {
                x: 50 + (course.year - 1) * yearGap,
                y: 50
            };
        }
        let x = columns[course.year].x;
        let y = columns[course.year].y;

        // 과목 그리기
        ctx.fillStyle = 'lightblue';
        ctx.fillRect(x, y, boxWidth, boxHeight);
        ctx.strokeStyle = 'blue';
        ctx.strokeRect(x, y, boxWidth, boxHeight);
        ctx.fillStyle = 'black';
        ctx.font = '16px Arial';
        ctx.fillText(course.subject, x + 10, y + 50);

        // 다음 과목 위치 업데이트
        columns[course.year].y += verticalGap + boxHeight;
    });
}
