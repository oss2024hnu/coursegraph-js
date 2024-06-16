import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';
mermaid.initialize({ startOnLoad: true });

document.addEventListener('DOMContentLoaded', function () {
    let searchText = '';
    let isFirstSearch = true;

    function doSearch(text) {

        if ((isFirstSearch || searchText !== text)&&(text === "")) {

            isFirstSearch = false;
            searchText = text;

            text = window.sessionStorage.getItem("text");

            if (!window.find(text, false, false, true, false, false, false)) {
                alert('일치하는 과목을 찾을 수 없습니다.');
                isFirstSearch = true;
            }
        } else {
            if (!window.find(text, false, false, false, false, false, false)) {
                window.find(text, false, false, true, false, false, false);

            }
        }
        if ((isFirstSearch || searchText !== text)&&(text !== "")) {
            isFirstSearch = false;
            searchText = text;
            let input = document.getElementById("SearchTxt");
            input.value = "";
            window.sessionStorage.setItem("text",text);

            if (!window.find(text, false, false, true, false, false, false)) {
                alert('일치하는 과목을 찾을 수 없습니다.');
                isFirstSearch = true;
            }
        } else {
            if (!window.find(text, false, false, false, false, false, false)) {
                window.find(text, false, false, true, false, false, false);

            }

        }
    }

    function doDeleteSpace(text) {
        return text.split(' ').join('');
    }

    document.getElementById('SearchBtn').addEventListener('click', function () {
        doSearch(document.getElementById('SearchTxt').value);
    });

    document.getElementById('SearchTxt').addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            doSearch(event.target.value);
        }
    });

    function toggleTransparency(elementsToResize) {
        let isTransparent = false;
        document.querySelectorAll('.node').forEach(node => {
            if (node.classList.contains('transparent')) {
                isTransparent = true;
            }
        });

        if (isTransparent) {
            document.querySelectorAll('.node').forEach(node => {
                node.classList.remove('transparent');
            });
        } else {
            document.querySelectorAll('.node').forEach(node => {
                node.classList.add('transparent');
            });

            elementsToResize.forEach(id => {
                const element = document.querySelector(`[data-id="${id}"]`);
                if (element) {
                    element.classList.remove('transparent');
                }
            });
        }
    }

    document.getElementById('majorSelection').addEventListener('click', function () {
        const elementsToResize = [
            'B1', 'B2', 'C2', 'C3', 'D1', 'D2', 'D3',
            'C5', 'D4', 'E2', 'E4', 'F2', 'F4', 'F5'
        ];
        toggleTransparency(elementsToResize);
    });

    document.getElementById('basicMajor').addEventListener('click', function () {
        const elementsToResize = [
            'A2', 'A3', 'A4', 'B3', 'B4', 'I1', 'I2'
        ];
        toggleTransparency(elementsToResize);
    });

    console.log('Script loaded and DOM fully parsed');
});

// 페이지 로드 시 특정 섹션으로 자동 스크롤
window.onload = function () {
    const element = document.getElementById("basicMajor");
    if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
};

function scrollToSection(sectionId) {
    const section = document.querySelector(`subgraph[title="${sectionId}"]`);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}
