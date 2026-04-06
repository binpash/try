sudo apt install python3.11 python3.11-venv attr mergerfs
python3.11 -m venv .venv
source .venv/bin/activate

pip install -e .
pip install pytest
