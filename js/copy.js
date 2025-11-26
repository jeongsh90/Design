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
        toast.className = "toast " + type;
        toast.innerText = message;

        container.appendChild(toast);

        setTimeout(() => {
            toast.remove();
        }, 2600);
    }

    const tooltip = document.createElement("div");
    tooltip.className = "copy-tooltip";
    tooltip.innerText = "복사하기";
    document.body.appendChild(tooltip);

    $(document)
        .on("mousemove", ".copy", function (e) {
            tooltip.style.left = (e.pageX + 40) + "px";
            tooltip.style.top = (e.pageY + 40) + "px";
            tooltip.style.opacity = "1";
        })
        .on("mouseleave", ".copy", function () {
            tooltip.style.opacity = "0";
        })
        .on("click", ".copy", function () {

            const html = $(this).html().trim();

            navigator.clipboard.writeText(html)
                .then(() => {
                    tooltip.innerText = "복사됨!";
                    tooltip.classList.remove("error");
                    tooltip.classList.add("success");

                    showToast("클립보드에 복사되었습니다.", "success");

                    setTimeout(() => {
                        tooltip.innerText = "복사하기";
                        tooltip.classList.remove("success");
                    }, 1000);
                })
                .catch(err => {
                    console.error("복사 실패:", err);

                    tooltip.innerText = "복사 실패!";
                    tooltip.classList.remove("success");
                    tooltip.classList.add("error");

                    showToast("복사 실패! 권한을 확인하세요.", "error");

                    setTimeout(() => {
                        tooltip.innerText = "복사하기";
                        tooltip.classList.remove("error");
                    }, 1200);
                });
        });


});
