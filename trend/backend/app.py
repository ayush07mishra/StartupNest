from flask import Flask, render_template, jsonify
from pytrends.request import TrendReq
import pandas as pd
import time

app = Flask(__name__)
pytrends = TrendReq()

# Split technologies into two groups to avoid the 5 keyword limit
TECHNOLOGIES_1 = ["Python", "C++", "JavaScript", "Java", "C#"]
TECHNOLOGIES_2 = ["Go", "Rust", "Swift", "Kotlin", "TypeScript"]

def fetch_trends(technologies):
    try:
        # Adding delay to avoid Google blocking the request
        time.sleep(5)
        
        # Build the payload for the last 12 months in the US
        pytrends.build_payload(technologies, cat=0, timeframe='today 12-m', geo='US')
        data = pytrends.interest_over_time()

        if data.empty:
            return {}
        
        # Convert Google Trends data to estimated users (Assume 100 = 1M users)
        trends_data = {tech: round(data[tech].mean() * 10000) for tech in technologies}
        return trends_data
    except Exception as e:
        print(f"Error fetching data: {e}")
        return {}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/data')
def data():
    data1 = fetch_trends(TECHNOLOGIES_1)
    data2 = fetch_trends(TECHNOLOGIES_2)
    return jsonify({**data1, **data2})

if __name__ == '__main__':
    app.run(debug=True)
