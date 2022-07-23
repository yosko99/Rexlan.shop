import InfoBarData from './infotBarTypes';

interface HeadingType {
    title: string;
    description: string;
}

interface HTMLFields {
    global: {
        findOutMore: string;
        categories: string;
        contacts: string;
        pricing: string;
        settings: string;
        orders: string;
        help: string;
    }
    header: {
        homeButton: string;
        languageSwitcherButton: string;
        contactsButton: string;
        loginButton: string;
        logoutButton: string;
        profileButton: string;
        favouritesButton: string;
        cartButton: string;
    },
    searchBar: {
        buttonText: string;
        titleText: string;
        inputfieldPlaceholder: string;
        productNotFound: string;
    }
    mainPage: {
        infoBar: InfoBarData[];
        featuredProductsHeading: HeadingType;
        summerCollectionHeading: HeadingType;
        bestSellersHeading: HeadingType;
        homegrownHeading: HeadingType;
    }
    footer: {
        usefullLinks: string;
        getConnected: string;
    }
}

export default HTMLFields;
