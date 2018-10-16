// Get sorted, filtered available pages

export const selectPages = (pages, { text }) => {
    return pages.filter((page) => {
        const textMatch = page.name.toLowerCase().includes(text.toLowerCase());
        return textMatch;
    }).sort((a, b) => {
        return a.name.localeCompare(b.name);
    });
};

export const selectPage = (pages, { id }) => {
    return pages.find((page) => {
        return page.id === id;
    });
};