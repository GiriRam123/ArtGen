import base64
import os
from datetime import datetime
from io import BytesIO

import torch
from auth_token import auth_token
from diffusers import StableDiffusionPipeline
from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

device = "cpu"  # Ensure it uses the CPU
model_id = "CompVis/stable-diffusion-v1-4"
pipe = StableDiffusionPipeline.from_pretrained(model_id,revision='fp16', use_auth_token=auth_token, torch_dtype=torch.float32)

#pipe.to(device)
pipe.enable_sequential_cpu_offload
@app.get("/")
def generate(prompt: str):
    image = pipe(prompt, guidance_scale=8.5).images[0]
    image.save(prompt+".png")
    # Convert the image to base64 to return in the HTTP response
    buffer = BytesIO()
    image.save(buffer, format="PNG")
    imgstr = base64.b64encode(buffer.getvalue())

    return Response(content=imgstr, media_type="image/png")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
