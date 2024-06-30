document.addEventListener('DOMContentLoaded', fetchRandomImages);
let excludeImageUrls = [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Denmark_film_clapperboard.svg/60px-Denmark_film_clapperboard.svg.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Translation_to_english_arrow.svg/100px-Translation_to_english_arrow.svg.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Graduation_hat.svg/60px-Graduation_hat.svg.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Crystal_Clear_app_linneighborhood.svg/60px-Crystal_Clear_app_linneighborhood.svg.png',
    'https://en.wikipedia.org/wiki/.m2ts',
    'https://upload.wikimedia.org/wikipedia/commons/c/c3/45_record.png',
    'https://en.wikipedia.org/wiki/1906%20Salisbury%20rail%20crash',
    'https://upload.wikimedia.org/wikipedia/commons/f/f6/Walnut.png',
    'https://upload.wikimedia.org/wikipedia/en/f/f4/Ambox_content.png',
    'https://upload.wikimedia.org/wikipedia/commons/1/16/EnWiki_redirect_-_Pichilemo.png',
    'https://upload.wikimedia.org/wikipedia/commons/0/07/Arbitration_fez.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Parentesi_Quadre.svg/60px-Parentesi_Quadre.svg.png',
    'https://upload.wikimedia.org/wikipedia/en/c/c2/Crystal_Clear_app_Login_Manager_2.png',
    'https://upload.wikimedia.org/wikipedia/commons/7/79/Example_image_not_to_be_used_in_article_namespace.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/f/f3/Pencil_with_manual_sharpener.png',
    'https://upload.wikimedia.org/wikipedia/commons/9/9c/Kit_body_whitestripes.png',
    'https://upload.wikimedia.org/wikipedia/commons/3/3f/Fairytale_key_enter-2.png',
    'https://upload.wikimedia.org/wikipedia/commons/6/6f/Policies_and_guidelines_indicator.png',
    'https://upload.wikimedia.org/wikipedia/commons/3/39/Category-diagram.png',
    'https://upload.wikimedia.org/wikipedia/commons/f/f4/Kit_body_yellowhorizontal.png',
    'https://upload.wikimedia.org/wikipedia/commons/4/49/Farm-Fresh_printer_add.png',
    'https://upload.wikimedia.org/wikipedia/en/d/d9/Green_check.png',
    'https://upload.wikimedia.org/wikipedia/commons/9/9c/Chicken_Eyeglasses_categories.png',
    'https://upload.wikimedia.org/wikipedia/commons/3/36/Badam_milk_spilled.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/4/4e/Copy_paste_page_move_example.png',
    'https://upload.wikimedia.org/wikipedia/commons/0/06/Oversight_logo.png',
    'https://en.wikipedia.org/wiki/Wikipedia%3AContent%20assessment'
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
                    if (!excludeImageUrls.includes(imageUrl) && (imageUrl.endsWith(".png") || imageUrl.endsWith(".jpg") || imageUrl.endsWith(".jpeg"))) {
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
            let firstLinkTitle = links[Math.floor(Math.random() * links.length)].title;
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

                if ((!secondImageUrl || excludeImageUrls.includes(secondImageUrl))) {
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
                link.target = "_blank";

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