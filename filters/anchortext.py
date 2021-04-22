
def anchortext(title):
    import re
    if title.startswith('<a'):
        return re.search('>(.*)<', title).group(1)
    else:
        return title
