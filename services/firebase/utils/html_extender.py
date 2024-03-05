"""
A simple script to add `.html` extensions to file names

usage: `html_extender.py [-h] dir_path`
"""

import argparse
import os
from pathlib import Path

def is_html_file(path):
    with open(str(path), 'r') as reader:
        return reader.readline().startswith("<!DOCTYPE html>")

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
    
    print(("{} total `.html` extensions added".format(change_count)))


if __name__ == '__main__':
    parser = argparse.ArgumentParser(
        description="Script that adds `.html` extension to HTML files in a given directory"
    )

    parser.add_argument(
        'dir_path',
        help='The path to the directory containing files'
    )

    args = parser.parse_args()

    main(args.dir_path)
