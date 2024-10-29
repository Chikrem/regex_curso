import requests
import re

# Define a URL do site que será acessado
url = "https://monicahillman.github.io/monibank/"

# Faz uma requisição GET para a URL
response = requests.get(url)

# Armazena o conteúdo HTML da resposta na variável html_content
html_content = response.text

# Define uma expressão regular para encontrar cabeçalhos (h1 e h2) no conteúdo HTML
pattern = r'<(h[1|2])[^>]*>(.*?)<\/\1>'

# Usa a expressão regular para encontrar todos os cabeçalhos (h1 e h2) no conteúdo HTML
headings = re.findall(pattern, html_content, re.DOTALL)

# Itera sobre os cabeçalhos encontrados e os imprime
for heading in headings:
    print(heading)
