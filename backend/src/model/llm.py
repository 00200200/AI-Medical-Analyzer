import os

try:
    from ollama import Client

    chat = Client(host=os.getenv("OLLAMA_HOST", "http://ollama:11434")).chat
except Exception:
    chat = ollama.chat


model = "edwardlo12/medgemma-4b-it-Q4_K_M"


def generate_answer_test_results(blood_report: str) -> str:
    messages = [
        {
            "role": "system",
            "content": "You are an expert hematologist, specialized in interpreting blood test results.",
        },
        {
            "role": "user",
            "content": f"Interpret the following blood test report and provide a clear, structured analysis, including potential concerns and recommended follow-up tests if any.\n\n{blood_report}",
        },
    ]
    try:
        answer = chat(model=model, messages=messages)
        return answer["message"]["content"]
    except Exception as e:
        print(f"Error calling Ollama: {str(e)}")
        return "Error: Could not connect to Ollama service. Please try again later."


def generate_answer_image(image: str) -> str:
    messages = [
        {
            "role": "system",
            "content": "You are an expert radiologist.",
        },
        {
            "role": "user",
            "content": "Describe the findings on this X-ray image.",
        },
    ]
    try:
        answer = chat(model=model, messages=messages, images=[image])
        return answer["message"]["content"]
    except Exception as e:
        print(f"Error calling Ollama: {str(e)}")
        return "Error: Could not connect to Ollama service for image analysis."
