import ollama

model = "amsaravi/medgemma-4b-it:q6"
system_prompt = "You are a helpful medical assistant."


def generate_answer_test_results(blood_report: str) -> str:
    messages = [
        {
            "role": "system",
            "content": [
                {
                    "type": "text",
                    "text": "You are an expert hematologist, specialized in interpreting blood test results.",
                }
            ],
        },
        {
            "role": "user",
            "content": [
                {"type": "text", "text": "Interpret this blood test report"},
                {"type": "text", "text": blood_report},
            ],
        },
    ]
    answer = ollama.chat(model=model, messages=messages)
    return answer["message"]["content"]


def generate_answer_image(image: str) -> str:
    messages = [
        {
            "role": "system",
            "content": [{"type": "text", "text": "You are an expert radiologist."}],
        },
        {
            "role": "user",
            "content": [
                {"type": "text", "text": "Describe this X-ray"},
                {"type": "image", "image": image},
            ],
        },
    ]
    answer = ollama.chat(model=model, messages=messages)
    return answer["message"]["content"]
