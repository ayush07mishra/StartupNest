import streamlit as st
import subprocess
import json

def call_gemini_api(user_input):
    api_key = "AIzaSyCGWiRdixPxKGnGSxG8FObonCH9DlYZwgo"  # Replace with your actual API key
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={api_key}"
    
    data = {
        "contents": [{
            "parts": [{"text": user_input}]
        }]
    }
    
    curl_command = [
        "curl", url,
        "-H", "Content-Type: application/json",
        "-X", "POST",
        "-d", json.dumps(data)
    ]
    
    result = subprocess.run(curl_command, capture_output=True, text=True)
    
    try:
        response = json.loads(result.stdout)
        return response.get("candidates", [{}])[0].get("content", {}).get("parts", [{}])[0].get("text", "No response")
    except json.JSONDecodeError:
        return "Error processing response"

st.title("Chatbot using Gemini API")
user_input = st.text_input("Ask me anything:")

if st.button("Send") and user_input:
    response = call_gemini_api(user_input)
    st.write("### Response:")
    st.write(response)
