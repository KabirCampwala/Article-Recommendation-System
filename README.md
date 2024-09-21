# 📄 Article Recommendation System

Welcome to the **Article Recommendation System**! <br> It allows you to input an article title or body and retrieves the 10 most similar articles based on content similarity. 🤖✨

## Key Features:
- **Input Flexibility:** Search by article title or body.
- **Similarity Matching:** Returns the top 10 most similar articles.
- **User-Friendly Interface:** Easy to navigate and get results.

## ✨ How It Works

The Article Recommendation System processes articles to provide relevant recommendations based on a user query. <br><br> Here's a step-by-step breakdown of the file ```article-recommender.py```:

1. **Text Cleaning:** The `TextCleaner` class uses `CountVectorizer` to convert the input query into a set of words, creating a vocabulary.

2. **Article Processing:** The `process_articles` function reads articles from a JSON file, ensuring each article contains essential information (title, text, author, etc.). Cleaned articles are stored for further processing.

3. **Score Calculation:** For each article, the `calculate_score` function compares the query against the article's text, calculating a similarity score based on the frequency of words from the vocabulary found in the article.

4. **Generating Recommendations:** The main function processes the articles, computes their scores, and sorts them to identify the top 10 articles most similar to the query. It outputs the recommendations as a JSON object containing titles, claps, reading times, links, and authors.

This approach leverages natural language processing techniques to deliver relevant content based on user input, making it a powerful tool for article discovery!


## 🚀 Getting Started

Follow the steps below to set up and run the project locally:

### 1. Clone the Repository
Download the repository to your local machine:
```bash
git clone https://github.com/KabirCampwala/Article-Recommendation-System
```

### 2. Navigate to Project Directory
Open your terminal and navigate to the project directory:
```bash
cd Article-Recommendation-System
```

### 3. Install Node.js Dependencies
Run the following command to install the required Node.js packages:
```bash
npm install
```

### 4. Install Python Dependencies
Ensure you have Python installed, then install the necessary Python packages:
```bash
pip install scikit-learn
```

### 5. Start the Server
Once all dependencies are installed, run the server:
```bash
nodemon server.js
```

### 6. Use the Application
Open your web browser and enter the URL provided in the terminal. Enter your query (article title or body) in the input field and hit enter to see the results! 🖥️🔍

## 📸 Screenshots

### Homepage
![Screenshot (397)](https://github.com/user-attachments/assets/635998af-2ca2-459a-a0e9-817f2a52b270)

### General Articles Page
![Screenshot (402)](https://github.com/user-attachments/assets/1068f519-51f7-461a-9738-36278fb7a729)

### Homepage with query
![Screenshot (398)](https://github.com/user-attachments/assets/bbd427a7-b565-48c6-8c7c-b21557eed74c)

### Query Results
![Screenshot (399)](https://github.com/user-attachments/assets/26c38286-bc72-4013-a7ed-ce240dbd341d)

![Screenshot (400)](https://github.com/user-attachments/assets/261271ce-7d9b-4d7c-aaa5-de39246ba96e)

![Screenshot (401)](https://github.com/user-attachments/assets/6a5b44ab-2800-4521-b40f-e3d5f76b02da)
