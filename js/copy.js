// copy.js
$(function () {

    const containerId = "toast-container";
    let container = document.getElementById(containerId);

    if (!container) {
        container = document.createElement("div");
        container.id = containerId;
        document.body.appendChild(container);
    }

    function showToast(message, type = "success") {
        const toast = document.createElement("div");
        toast.className = "toast " + type; // CSS는 너가 작성
        toast.innerText = message;

        container.appendChild(toast);

        setTimeout(() => {
            toast.remove();
        }, 2600);
    }

    $(document).on("click", ".copy", function () {

        const html = $(this).html().trim();

        navigator.clipboard.writeText(html)
            .then(() => {
                showToast("클립보드에 복사되었습니다.", "success");
            })
            .catch(err => {
                console.error("복사 실패:", err);
                showToast("복사 실패! 권한을 확인하세요.", "error");
            });
    });

});
