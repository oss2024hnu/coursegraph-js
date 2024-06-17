const subjectDetails = {
    "웹스크립트프로그래밍": "이 과목은 웹 개발에 필요한 스크립트 언어를 배웁니다.",
    // 다른 과목의 세부 정보 추가
};

document.getElementById('goBackBtn').addEventListener('click', function () {
    window.location.href = '/index.html';
});
document.getElementById('reset-button').addEventListener('click', function () {
    location.reload();
});
console.log('Script loaded and DOM fully parsed');

        function doSearch(text) {
            const content = document.querySelector('.mermaid');
            const regex = new RegExp(`(${text})`, 'gi');
            content.innerHTML = content.innerHTML.replace(/(<mark>|<\/mark>)/gim, "").replace(regex, '<mark>$1</mark>');
        }
