
import re
import warnings

TYPE_REGEXP = r"(?:arrayof\s+)?\w+"


def parse_interface(interface_items):
    parsed = []
    for key, value in interface_items.iteritems():
        if "(" in key:
            # Item is a method
            match = re.match(r"^\s*(%s)\s+(\S+)\s*\(\s*([^\)]*)\s*\)\s*$" % TYPE_REGEXP, key)
            if not match:
                warnings.warn("Skipped malformed method: '%s'" % key)
                continue
            return_type, property_name, argument_string = match.groups()
            arguments = []
            if argument_string:
                for argument in argument_string.split(","):
                    if argument.strip():
                        match = re.match(r"^\s*(%s)\s+(\S+)\s*$" % TYPE_REGEXP, argument)
                        if not match:
                            warnings.warn("Skipped malformed argument: '%s'" % argument)
                            continue
                        argument_type, argument_name = match.groups()
                        arguments.append({
                            "name": argument_name,
                            "type": argument_type
                        })
            value.update({
                "type": "method",
                "name": property_name,
                "return_type": return_type,
                "arguments": arguments
            })
            parsed.append(value)
        else:
            # Item is a property
            match = re.match(r"^\s*(readonly\s+)?(%s)\s+(\S+)\s*$" % TYPE_REGEXP, key)
            if not match:
                warnings.warn("Skipped malformed property: '%s'" % key)
                continue
            property_modifier, property_type, property_name = match.groups()
            value.update({
                "type": property_type,
                "name": property_name,
                "modifier": property_modifier or ""
            })
            parsed.append(value)
    parsed.sort(key=lambda x: x["name"])
    return parsed
