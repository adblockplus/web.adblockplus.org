document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const adsBlocked = params.get('ads_blocked');

    if (adsBlocked && !isNaN(adsBlocked)) {
        const countElement = document.getElementById('ads-blocked-count');
        const infoBlock = document.getElementById('ads-blocked-info');

        if (countElement && infoBlock) {
            countElement.textContent = Number(adsBlocked).toLocaleString();
            infoBlock.style.display = 'flex';
        }
    }
});
