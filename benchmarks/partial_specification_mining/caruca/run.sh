mkdir -p save outputs
for file in src/caruca/pash_syntax_specs/*.py; do
	cmd=$(basename "$file" .py)

	echo "Running command with argument $cmd"
	caruca trace --pash --stdin split --content split "$cmd"
	caruca annotate pash "$cmd" > save/"$cmd".json
done
