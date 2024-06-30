document.addEventListener('DOMContentLoaded', fetchRandomImages);
let excludeImageUrls = [
    'https://upload.wikimedia.org/wikipedia/en/4/4a/Commons-logo.svg',
    'https://upload.wikimedia.org/wikipedia/en/5/5f/Disambig_gray.svg',
    'https://upload.wikimedia.org/wikipedia/en/8/8a/OOjs_UI_icon_edit-ltr-progressive.svg',
    'https://en.wikipedia.org/wiki/File:Denmark_film_clapperboard.svg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Denmark_film_clapperboard.svg/60px-Denmark_film_clapperboard.svg.png',
    'https://upload.wikimedia.org/wikipedia/commons/f/fe/France_film_clapperboard.svg',
    'https://upload.wikimedia.org/wikipedia/en/b/b4/Ambox_important.svg',
    'https://upload.wikimedia.org/wikipedia/en/1/1d/Information_icon4.svg',
    'https://upload.wikimedia.org/wikipedia/commons/0/0b/Ambox_globe_Asia_Australia.svg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Translation_to_english_arrow.svg/100px-Translation_to_english_arrow.svg.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Graduation_hat.svg/60px-Graduation_hat.svg.png',
    'https://upload.wikimedia.org/wikipedia/commons/8/8a/OOjs_UI_icon_edit-ltr.svg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Crystal_Clear_app_linneighborhood.svg/60px-Crystal_Clear_app_linneighborhood.svg.png',
    'https://upload.wikimedia.org/wikipedia/commons/a/a6/India_film_clapperboard_%28variant%29.svg',
    'https://upload.wikimedia.org/wikipedia/en/2/24/Crystal_personal.svg',
    'https://upload.wikimedia.org/wikipedia/commons/f/f8/Bullseye1.png',
    'https://upload.wikimedia.org/wikipedia/commons/b/b0/Increase2.svg',
    'https://upload.wikimedia.org/wikipedia/commons/8/8f/Athletics_pictogram.svg',
    'https://upload.wikimedia.org/wikipedia/en/e/e7/Video-x-generic.svg',
    'https://upload.wikimedia.org/wikipedia/en/6/62/PD-icon.svg',
    'https://en.wikipedia.org/wiki/.m2ts',
    'https://upload.wikimedia.org/wikipedia/commons/c/c3/45_record.png',
    'https://upload.wikimedia.org/wikipedia/commons/8/8a/Translation_to_english_arrow.svg',
    'https://upload.wikimedia.org/wikipedia/en/9/99/Question_book-new.svg',
    'https://upload.wikimedia.org/wikipedia/commons/4/4c/Wikisource-logo.svg',
    'https://upload.wikimedia.org/wikipedia/commons/9/99/WPanthroponymy.svg',
    'https://upload.wikimedia.org/wikipedia/en/9/96/Symbol_category_class.svg',
    'https://upload.wikimedia.org/wikipedia/commons/1/1c/Wiki_letter_w_cropped.svg',
    'https://upload.wikimedia.org/wikipedia/commons/3/31/Redirect_arrow_without_text.svg',
    'https://upload.wikimedia.org/wikipedia/commons/e/eb/Blue_check.svg',
    'https://upload.wikimedia.org/wikipedia/commons/0/03/Green_check.svg',
    'https://upload.wikimedia.org/wikipedia/commons/3/37/People_icon.svg',
    'https://upload.wikimedia.org/wikipedia/commons/f/f1/Redirect_categorization_symbol.svg'
];

async function getImageURL(randomPageId, randomPageTitle) {
    try {
        const pageDetailsUrl = `https://en.wikipedia.org/w/api.php?action=query&pageids=${randomPageId}&prop=images&format=json&origin=*`;
        const pageDetailsResponse = await fetch(pageDetailsUrl);
        const pageDetailsData = await pageDetailsResponse.json();
        const pages = pageDetailsData.query.pages;
        const page = pages[randomPageId];

        if (page && page.images && page.images.length > 0) {
            for (const image of page.images) {
                const imageFileName = image.title;

                const imageInfoUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(imageFileName)}&prop=imageinfo&iiprop=url&format=json&origin=*`;
                const imageInfoResponse = await fetch(imageInfoUrl);
                const imageInfoData = await imageInfoResponse.json();
                const imagePages = imageInfoData.query.pages;
                const imagePage = Object.values(imagePages)[0];

                if (imagePage && imagePage.imageinfo && imagePage.imageinfo.length > 0) {
                    const imageUrl = imagePage.imageinfo[0].url;
                    if (!excludeImageUrls.includes(imageUrl)) {
                        const pageUrl = `https://en.wikipedia.org/wiki/${encodeURIComponent(randomPageTitle)}`;
                        return [imageUrl, pageUrl];
                    }
                }
            }
        }

        return [null, null];
    } catch (error) {
        console.error('Error fetching image URL:', error);
        return [null, null];
    }
}

async function fetchRandomImages() {
    const imageElement = document.getElementById('random-image');
    const imageLink = document.getElementById('image-link');
    const messageElement = document.getElementById('message');
    let imageUrl = null;
    let pageUrl = null;
    let randomPageId = null;
    let randomPageTitle = null;

    try {
        while (!imageUrl) {
            const randomPageJson = `https://en.wikipedia.org/w/api.php?action=query&list=random&rnnamespace=0&rnlimit=1&format=json&origin=*`;
            const randomPageResponse = await fetch(randomPageJson);
            const randomPageData = await randomPageResponse.json();
            const randomPage = randomPageData.query.random[0];
            randomPageId = randomPage.id;
            randomPageTitle = randomPage.title;
            const output = await getImageURL(randomPageId, randomPageTitle);
            imageUrl = output[0];
            pageUrl = output[1];
        }
        excludeImageUrls.push(imageUrl);
        imageElement.src = imageUrl;
        imageLink.href = pageUrl;
    } catch (error) {
        console.error('Error fetching random images:', error);
        messageElement.textContent = 'Failed to fetch random images. Please try again.';
    }

    let linkIndex = 0;
    while (true) {
        let firstLinkUrl = `https://en.wikipedia.org/w/api.php?action=query&pageids=${randomPageId}&prop=links&format=json&pllimit=100&origin=*`;
        console.log(randomPageId);
        let firstLinkResponse = await fetch(firstLinkUrl);
        let firstLinkData = await firstLinkResponse.json();
        let links = firstLinkData.query.pages[randomPageId].links;

        if (links && links.length > 2) {
            console.log(linkIndex);
            let firstLinkTitle = links[linkIndex].title;
            let firstLinkPageUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(firstLinkTitle)}&prop=pageimages|links&format=json&origin=*`;
            let firstLinkPageResponse = await fetch(firstLinkPageUrl);
            let firstLinkPageData = await firstLinkPageResponse.json();
            let firstLinkPages = firstLinkPageData.query.pages;
            let firstLinkPage = Object.values(firstLinkPages)[0];

            if (firstLinkPage && firstLinkPage.pageid && firstLinkPage.links && firstLinkPage.links.length > 2) {
                randomPageId = firstLinkPage.pageid;
                randomPageTitle = firstLinkPage.title;
                const secondOutput = await getImageURL(randomPageId, randomPageTitle);
                const secondImageUrl = secondOutput[0];
                const secondPageUrl = secondOutput[1];

                if (!secondImageUrl || excludeImageUrls.includes(secondImageUrl)) {
                    linkIndex++;
                    continue;
                } else {
                    linkIndex = 0;
                }

                const img = document.createElement('img');
                img.src = secondImageUrl;
                excludeImageUrls.push(secondImageUrl);
                img.classList.add('random-image');

                const link = document.createElement('a');
                link.href = secondPageUrl;

                const customElement = document.createElement('div');
                customElement.classList.add('image-container');

                customElement.appendChild(img);
                link.appendChild(customElement);

                document.body.appendChild(link);
            } else {
                linkIndex++;
            }
        } else {
            messageElement.textContent = 'You have reached the end of a link path or there are no pages with more than 2 links.';
            break;
        }
    }
}
