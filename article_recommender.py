import json
from sklearn.feature_extraction.text import CountVectorizer
import sys
import logging

logging.basicConfig(filename='article_recommender.log', level=logging.DEBUG)

class TextCleaner(object):

  def __init__(self, doc):
    self.doc = doc

  def process(self):
    vectorizer = CountVectorizer()
    X = vectorizer.fit_transform(self.doc)
    corpus = vectorizer.get_feature_names_out()
    return corpus

def process_articles(json_file):
  cleaned_articles = []
  try:
    with open(json_file, 'r', encoding='utf-8') as file:
      data = json.load(file)
      for article in data:
        if all(key in article and article[key] for key in ['author', 'claps', 'reading_time', 'link', 'title', 'text']):
          cleaned_articles.append((article['text'].split(), article['title'], article['claps'], article['reading_time'], article['link'], article['author']))
    return cleaned_articles
  except FileNotFoundError:
    logging.error(f"Error: Could not find JSON file: {json_file}")
    sys.exit(1)
  except json.JSONDecodeError as e:
    logging.error(f"Error parsing JSON file: {json_list}. {e}")
    sys.exit(1)

def calculate_score(query, article):
  helper = TextCleaner(doc=[query])
  vocabulary = helper.process()

  article_lower = [word.lower() for word in article[0]]

  freq = []
  for key in vocabulary:
    try:
      term_freq = article_lower.count(key.lower())
      freq.append(term_freq)
    except Exception as e:
      logging.error(f"Error calculating term frequency for word: {key}. Exception: {e}")
      pass

  score = sum(freq) / len(article[0]) if len(article[0]) > 0 else 0
  return score, article[1:] if len(article) >= 5 else (None, None, None, None)

def main(query, json_file):
  try:
    articles = process_articles(json_file)
    scores = []
    for i, article in enumerate(articles):
      score, article_info = calculate_score(query, article)
      if article_info[0] is not None:
        scores.append((i+1, score, article_info))

    scores.sort(key=lambda x: x[1], reverse=True)

    recommendations = [{'title': article[0], 'claps': article[1], 'reading_time': article[2], 'link': article[3], 'author':article[4] } for _, _, article in scores[:10]]
    print(json.dumps(recommendations))
  except Exception as e:
    logging.error(f"Error generating recommendations: {e}")
    sys.exit(1)



if __name__ == "__main__":
  if len(sys.argv) != 3:
    print("Usage: python article_recommender.py <query> <json_file>")
    sys.exit(1)

  query = sys.argv[1]
  json_file = sys.argv[2]
  main(query, json_file)