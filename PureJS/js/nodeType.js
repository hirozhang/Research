function next(elem) {
    while(elem.nodeType != Node.TEXT_NODE) {
        elem = elem.nextSibling();
        break;
    }
    return elem;
}