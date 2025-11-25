// copy.js
$(function () {

    /* ------------------------------------------------------------
       1. 토스트 컨테이너 자동 생성 (필요 시 자동 생성)
    ------------------------------------------------------------ */
    const containerId = "toast-container";
    let container = document.getElementById(containerId);

    if (!container) {
        container = document.createElement("div");
        container.id = containerId;
        document.body.appendChild(container);
    }

    /* ------------------------------------------------------------
       2. 토스트 메시지 함수
    ------------------------------------------------------------ */
    function showToast(message, type = "success") {
        const toast = document.createElement("div");
        toast.className = "toast " + type; // CSS는 너가 작성
        toast.innerText = message;

        container.appendChild(toast);

        setTimeout(() => {
            toast.remove();
        }, 2600);
    }

    /* ------------------------------------------------------------
       3. .copy 클릭 → HTML 복사 + 토스트 표시
    ------------------------------------------------------------ */
    $(document).on("click", ".copy", function () {

        const html = $(this).html().trim();

        navigator.clipboard.writeText(html)
            .then(() => {
                showToast("복사 완료!", "success");
            })
            .catch(err => {
                console.error("복사 실패:", err);
                showToast("복사 실패! 권한을 확인하세요.", "error");
            });
    });

});
