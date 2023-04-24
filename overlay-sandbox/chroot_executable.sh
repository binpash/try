mount -t proc proc /proc &&
cd $start_dir && 
source ${script_to_execute}
## Save the output shell variables to a file (to pass to the outside context)
source "$RUNTIME_DIR/pash_declare_vars.sh" "$OUTPUT_VARIABLE_FILE"
pash_redir_output echo "Sandbox ${CMD_ID} Output variables saved in: $OUTPUT_VARIABLE_FILE"
