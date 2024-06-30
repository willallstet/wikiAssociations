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
    'https://upload.wikimedia.org/wikipedia/commons/f/f1/Redirect_categorization_symbol.svg',
    'https://upload.wikimedia.org/wikipedia/en/1/1b/Semi-protection-shackle.svg',
    'https://upload.wikimedia.org/wikipedia/commons/9/97/Canada_film_clapperboard.svg',
    'https://upload.wikimedia.org/wikipedia/en/8/89/Symbol_redirect_vote2.svg',
    'https://upload.wikimedia.org/wikipedia/commons/f/f9/Crystal_Clear_app_linneighborhood.svg',
    'https://upload.wikimedia.org/wikipedia/en/f/f2/Edit-clear.svg',
    'https://en.wikipedia.org/wiki/1906%20Salisbury%20rail%20crash',
    'https://upload.wikimedia.org/wikipedia/commons/f/f6/Walnut.png',
    'https://upload.wikimedia.org/wikipedia/en/f/f4/Ambox_content.png',
    'https://upload.wikimedia.org/wikipedia/commons/7/7f/Redirect_arrow_without_text_%28cropped%29.svg',
    'https://upload.wikimedia.org/wikipedia/commons/4/4b/Books-aj.svg_aj_ashton_01.svg',
    'https://upload.wikimedia.org/wikipedia/commons/d/de/Check-71-128-204-brightblue.svg',
    'https://upload.wikimedia.org/wikipedia/en/8/80/Wikipedia-logo-v2.svg',
    'https://upload.wikimedia.org/wikipedia/en/7/74/Ambox_warning_yellow.svg',
    'https://upload.wikimedia.org/wikipedia/en/f/f1/Stop_hand_nuvola.svg',
    'https://upload.wikimedia.org/wikipedia/commons/4/43/Test_Template_Info-Icon_-_Version_%282%29.svg',
    'https://upload.wikimedia.org/wikipedia/commons/7/71/Symbol_redirect_arrow_with_gradient.svg',
    'https://upload.wikimedia.org/wikipedia/en/8/8c/Extended-protection-shackle.svg',
    'https://upload.wikimedia.org/wikipedia/commons/1/16/EnWiki_redirect_-_Pichilemo.png',
    'https://upload.wikimedia.org/wikipedia/commons/8/80/Wikipedia-logo-v2.svg',
    'https://upload.wikimedia.org/wikipedia/en/0/01/A_coloured_voting_box.svg',
    'https://upload.wikimedia.org/wikipedia/commons/4/46/Vote_icon.svg',
    'https://upload.wikimedia.org/wikipedia/commons/7/7e/Essay.svg',
    'https://upload.wikimedia.org/wikipedia/en/5/5f/Ambox_warning_orange.svg',
    'https://upload.wikimedia.org/wikipedia/commons/2/21/AFC-Logo.svg',
    'https://upload.wikimedia.org/wikipedia/commons/e/e0/Decision_making.svg',
    'https://upload.wikimedia.org/wikipedia/commons/a/a5/Police_man_Twinkle_Head.svg',
    'https://upload.wikimedia.org/wikipedia/en/5/53/Template-protection-shackle.svg',
    'https://upload.wikimedia.org/wikipedia/en/6/6c/Wiki_letter_w.svg',
    'https://upload.wikimedia.org/wikipedia/en/e/e0/Symbol_question.svg',
    'https://upload.wikimedia.org/wikipedia/commons/e/ed/Decrease2.svg',
    'https://upload.wikimedia.org/wikipedia/commons/f/fc/View-refresh.svg',
    'https://upload.wikimedia.org/wikipedia/en/1/1f/Clipboard.svg',
    'https://upload.wikimedia.org/wikipedia/commons/0/0f/Mergefrom.svg',
    'https://upload.wikimedia.org/wikipedia/commons/d/d1/Wikipedia_Administrator.svg',
    'https://upload.wikimedia.org/wikipedia/commons/f/f3/Redirect_arrow.svg',
    'https://upload.wikimedia.org/wikipedia/commons/0/0c/Red_pog.svg',
    'https://upload.wikimedia.org/wikipedia/en/0/0f/Cascade-protection-shackle.svg',
    'https://upload.wikimedia.org/wikipedia/commons/9/98/Ambox_current_red.svg',
    'https://upload.wikimedia.org/wikipedia/commons/8/88/At_sign.svg',
    'https://en.wikipedia.org/wiki/1892%20Chicago%20Colts%20season',
    'https://upload.wikimedia.org/wikipedia/en/b/b4/Ambox_important.svg',
    'https://upload.wikimedia.org/wikipedia/commons/b/bd/Ambox_globe_content.svg',
    'https://upload.wikimedia.org/wikipedia/en/7/72/Disambig.svg',
    'https://upload.wikimedia.org/wikipedia/commons/8/8a/OOjs_UI_icon_edit-ltr.svg',
    'https://upload.wikimedia.org/wikipedia/en/3/35/Information_icon.svg',
    'https://upload.wikimedia.org/wikipedia/commons/0/07/Arbitration_fez.png',
    'https://upload.wikimedia.org/wikipedia/commons/1/15/Edit-copy_green.svg',
    'https://upload.wikimedia.org/wikipedia/commons/b/bd/Ambox_current_red_Asia_Australia.svg',
    'https://upload.wikimedia.org/wikipedia/commons/0/0e/Closed_Access_logo_transparent.svg',
    'https://upload.wikimedia.org/wikipedia/en/e/e7/Cscr-featured.svg',
    'https://upload.wikimedia.org/wikipedia/commons/5/5f/Consensus_Flowchart.svg',
    'https://upload.wikimedia.org/wikipedia/commons/9/96/Admin_mop.PNG',
    'https://upload.wikimedia.org/wikipedia/commons/8/8c/DAB_list_gray.svg',
    'https://upload.wikimedia.org/wikipedia/commons/a/a8/Disc_Plain_blue_dark.svg',
    'https://upload.wikimedia.org/wikipedia/commons/4/4e/Crystal_Clear_mimetype_html.svg',
    'https://upload.wikimedia.org/wikipedia/commons/4/4d/Crystal_Clear_mimetype_html.png',
    'https://upload.wikimedia.org/wikipedia/commons/8/8e/Icon_tools.svg',
    'https://upload.wikimedia.org/wikipedia/commons/9/99/Ambox_globe_Americas.svg',
    'https://upload.wikimedia.org/wikipedia/commons/9/9f/Ambox_humor.svg',
    'https://upload.wikimedia.org/wikipedia/en/5/5f/Disambig_gray.svg',
    'https://upload.wikimedia.org/wikipedia/commons/9/9e/Twemoji_1f527.svg',
    'https://upload.wikimedia.org/wikipedia/en/d/d9/Green_check.png',
    'https://upload.wikimedia.org/wikipedia/commons/c/cf/Lua-Logo.svg',
    'https://upload.wikimedia.org/wikipedia/commons/a/a4/Text_document_with_red_question_mark.svg',
    'https://upload.wikimedia.org/wikipedia/en/1/15/Ambox_warning_pn.svg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Parentesi_Quadre.svg/60px-Parentesi_Quadre.svg.png',
    'https://upload.wikimedia.org/wikipedia/commons/5/53/Ambox_current_red_Americas.svg',
    'https://upload.wikimedia.org/wikipedia/commons/5/53/Softredirarrow.svg',
    'https://upload.wikimedia.org/wikipedia/en/c/c2/Crystal_Clear_app_Login_Manager_2.png',
    'https://upload.wikimedia.org/wikipedia/commons/8/83/Symbol_template_class_pink.svg',
    'https://upload.wikimedia.org/wikipedia/en/4/44/Full-protection-shackle.svg',
    'https://upload.wikimedia.org/wikipedia/commons/8/83/Kit_body.svg',
    'https://upload.wikimedia.org/wikipedia/commons/1/1f/Tools.svg',
    'https://upload.wikimedia.org/wikipedia/commons/9/9c/Adminrib20.svg',
    'https://upload.wikimedia.org/wikipedia/commons/e/e8/Noun-linguistics.svg',
    'https://upload.wikimedia.org/wikipedia/commons/a/aa/Merge-arrow.svg',
    'https://upload.wikimedia.org/wikipedia/commons/6/66/DodgerBlue_flag_waving.svg',
    'https://upload.wikimedia.org/wikipedia/commons/4/49/Star_empty.svg',
    'https://upload.wikimedia.org/wikipedia/en/0/02/Create-protection-shackle.svg',
    'https://upload.wikimedia.org/wikipedia/commons/2/2a/Contactus-wmcolors.svg',
    'https://upload.wikimedia.org/wikipedia/commons/7/73/Blue_pencil.svg',
    'https://upload.wikimedia.org/wikipedia/commons/8/83/Gnome-insert-image.svg',
    'https://upload.wikimedia.org/wikipedia/commons/3/34/Ambox_warning_blue.svg',
    'https://upload.wikimedia.org/wikipedia/commons/7/79/Example_image_not_to_be_used_in_article_namespace.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/d/d7/Blue_pog.svg',
    'https://upload.wikimedia.org/wikipedia/commons/a/a2/X_mark.svg',
    'https://upload.wikimedia.org/wikipedia/commons/5/55/Bills_and_coins.svg',
    'https://upload.wikimedia.org/wikipedia/commons/9/99/Wiktionary-logo-en-v2.svg',
    'https://upload.wikimedia.org/wikipedia/commons/7/79/Articles_for_improvement_star.svg',
    'https://upload.wikimedia.org/wikipedia/commons/7/71/Arrow_east.svg',
    'https://upload.wikimedia.org/wikipedia/commons/f/f3/Pencil_with_manual_sharpener.png',
    'https://upload.wikimedia.org/wikipedia/en/e/e2/Symbol_portal_class.svg'
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