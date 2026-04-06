import requests

# Define the API endpoint
url = "https://api.stackexchange.com/2.3/questions"
params = {
    "order": "desc",
    "sort": "votes",
    "tagged": "shell",
    "site": "stackoverflow",
    "pagesize": 100
}

# Make the request
response = requests.get(url, params=params)
data = response.json()

# Extract the questions
questions = data.get("items", [])

# Display the 100 most popular questions
for question in questions:
    print(f"Title: {question['title']}")
    print(f"Link: {question['link']}\n")
