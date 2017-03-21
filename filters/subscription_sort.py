# This file is part of the Adblock Plus website,
# Copyright (C) 2006-2017 eyeo GmbH
#
# Adblock Plus is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License version 3 as
# published by the Free Software Foundation.
#
# Adblock Plus is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with Adblock Plus.  If not, see <http://www.gnu.org/licenses/>.


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
