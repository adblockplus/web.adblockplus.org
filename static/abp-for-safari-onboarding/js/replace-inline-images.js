document.addEventListener('DOMContentLoaded', () => {
    const content = document.querySelector('.content-container') || document.querySelector('.content');
    const html = content.innerHTML;

    // Replace image placeholders with actual img tags
    content.innerHTML = html.replace(/\[\[IMG:([^\]]+)]]/g, (match, imgName) => {
        return `<img src="/abp-for-safari-onboarding/img/${imgName}.svg" alt="${imgName.replace('_', ' ')}">`;
    });
});