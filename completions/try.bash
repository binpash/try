_try() {
    local i cur prev opts cmds
    COMPREPLY=()
    cur="${COMP_WORDS[COMP_CWORD]}"
    prev="${COMP_WORDS[COMP_CWORD-1]}"
    cmd=""
    opts=""

    for i in ${COMP_WORDS[@]}
    do
        case "${i}" in
            try)
                cmd="try"
                ;;

            *)
                ;;
        esac
    done

    case "${cmd}" in
        try)
            opts="-n -y -v -h -i -D -U summary commit explore"
            if [[ ${cur} == -* || ${COMP_CWORD} -eq 1 ]] ; then
                COMPREPLY=( $(compgen -W "${opts}" -- "${cur}") )
                return 0
            fi
            case "${prev}" in
                -D)
                    COMPREPLY=($(compgen -d "${cur}"))
                    return 0
                    ;;
                -U)
                    COMPREPLY=($(compgen -c "${cur}"))
                    return 0
                    ;;
                commit)
                    COMPREPLY=($(compgen -d "${cur}"))
                    return 0
                    ;;
                summary)
                    COMPREPLY=($(compgen -d "${cur}"))
                    return 0
                    ;;
                *)
                    COMPREPLY=()
                    ;;
            esac
            COMPREPLY=( $(compgen -W "${opts}" -- "${cur}") )
            return 0
            ;;

    esac
}

complete -F _try -o bashdefault -o default try
