import os
import re
import spacy
import sys

def process_headings(file_path, nlp):
    """
    Processes a markdown file to correct heading cases and verb forms.
    """
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            lines = f.readlines()
    except Exception as e:
        print(f"Error reading {file_path}: {e}", file=sys.stderr)
        return

    new_lines = []
    modified = False
    
    heading_regex = re.compile(r'^(#+)(\s+)(.*)')

    for line in lines:
        original_line = line
        match = heading_regex.match(line)
        
        if match:
            hashes = match.group(1)
            space = match.group(2)
            title = match.group(3).rstrip()
            
            if not title:
                new_lines.append(original_line)
                continue

            # 1. To Sentence case
            words = title.split(' ')
            if words:
                new_words = [words[0].capitalize()]
                for word in words[1:]:
                    if len(word) > 1 and word.isupper():
                        new_words.append(word)
                    else:
                        new_words.append(word.lower())
                sent_case_title = ' '.join(new_words)
            else:
                sent_case_title = ""

            # 2. Verb check
            if sent_case_title:
                doc = nlp(sent_case_title)
                # Handle cases where doc might be empty
                if not doc:
                    final_title = sent_case_title
                else:
                    first_token = doc[0]
                    
                    if first_token.pos_ == 'VERB' and first_token.text.lower() != first_token.lemma_:
                        lemma = first_token.lemma_
                        words = sent_case_title.split(' ')
                        words[0] = lemma.capitalize()
                        final_title = ' '.join(words)
                    else:
                        final_title = sent_case_title
            else:
                final_title = ""

            new_line = f"{hashes}{space}{final_title}\n"

            if new_line != original_line:
                if not modified: # Print file path only once
                    print(f"--- {file_path}")
                modified = True
                print(f"- {original_line.strip()}")
                print(f"+ {new_line.strip()}")
                new_lines.append(new_line)
            else:
                new_lines.append(original_line)
        else:
            new_lines.append(original_line)

    if modified:
        try:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.writelines(new_lines)
            print(f"Updated {file_path}\n")
        except Exception as e:
            print(f"Error writing to {file_path}: {e}", file=sys.stderr)

def main():
    """
    Main function to scan directory and process files.
    """
    try:
        nlp = spacy.load("en_core_web_sm")
    except IOError:
        print("Spacy 'en_core_web_sm' model not found. Please run 'python3 -m spacy download en_core_web_sm'", file=sys.stderr)
        sys.exit(1)

    target_dir = 'docs/sys-admin'
    if not os.path.isdir(target_dir):
        print(f"Directory not found: {target_dir}", file=sys.stderr)
        return
        
    for root, _, files in os.walk(target_dir):
        for file in files:
            if file.endswith(('.md', '.html.md')):
                file_path = os.path.join(root, file)
                process_headings(file_path, nlp)

if __name__ == "__main__":
    main()
