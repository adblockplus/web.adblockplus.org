"""
A simple script to add `.html` extensions to file names

usage: `html_extender.py [-h] dir_path`
"""

import argparse
import os
from pathlib import Path


def is_html_file(path):
    try:
        with open(str(path), encoding="utf-8") as reader:
            return reader.readline().startswith("<!DOCTYPE html>")
    except UnicodeDecodeError:
        # Not a UTF-8 text file (e.g. a binary asset or a macOS .DS_Store),
        # so it is certainly not an HTML page.
        return False

def is_html_file_without_ext(path):
    return path.exists() and path.is_file() and path.suffix == '' and is_html_file(path)

def add_html_extension(path):
    os.rename(str(path), (str(path) + '.html'))

def main(dir_path):
    os.chdir(dir_path)
    change_count = 0

    for p in Path('.').glob('**/*'):
        if is_html_file_without_ext(p):
            add_html_extension(p)
            change_count += 1

    print(f"{change_count} total `.html` extensions added")


if __name__ == '__main__':
    parser = argparse.ArgumentParser(
        description="Script that adds `.html` extension to HTML files "
                    "in a given directory"
    )

    parser.add_argument(
        'dir_path',
        help='The path to the directory containing files'
    )

    args = parser.parse_args()

    main(args.dir_path)
