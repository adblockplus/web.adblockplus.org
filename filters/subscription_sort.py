
def subscription_sort(value, prioritize_recommended=True):
    if prioritize_recommended:
        return sorted(value, lambda a, b: (
            cmp(a.type, b.type) or
            cmp(a.deprecated, b.deprecated) or
            cmp(b.catchall, a.catchall) or
            cmp(b.recommendation is not None, a.recommendation is not None) or
            cmp(a.name.lower(), b.name.lower())
        ))
    else:
        return sorted(value, lambda a, b: (
            cmp(a.type, b.type) or
            cmp(a.deprecated, b.deprecated) or
            cmp(a.name.lower(), b.name.lower())
        ))
