pub(crate) mod rules;

use std::collections::{HashMap, HashSet};

use crate::annotation::rules::{
    Condition, IGNORE_COMMANDS, PURE_COMMANDS, READ_ONLY_COMMANDS, STATELESS_COMMANDS,
};
use crate::command::Command;

#[derive(Clone, Debug)]
struct CommandArguments {
    values: Vec<String>,
    flags: HashSet<String>,
}

pub(crate) fn skip_command(command: &Command, environment: &HashMap<String, String>) -> bool {
    IGNORE_COMMANDS.contains(&command.name.as_str())
        || environment.contains_key(&format!("BASH_FUNC_{}%%", command.name))
}

pub(crate) fn check_pure(command: &Command) -> bool {
    check_conditions(PURE_COMMANDS, command)
}

pub(crate) fn check_stateless(command: &Command) -> bool {
    check_conditions(STATELESS_COMMANDS, command)
}

pub(crate) fn check_read_only(command: &Command) -> bool {
    check_conditions(READ_ONLY_COMMANDS, command)
}

fn check_conditions(conditions: &[Condition], command: &Command) -> bool {
    if conditions.iter().all(|c| c.name != command.name) {
        return false;
    }
    let arguments = parse_arguments(&command.arguments);
    conditions
        .iter()
        .any(|c| check_condition(c, command, &arguments.values, &arguments.flags))
}

fn check_condition(
    condition: &Condition,
    command: &Command,
    values: &[String],
    flags: &HashSet<String>,
) -> bool {
    condition.name == command.name
        && condition.disallowed_flags.iter().all(|&f| !flags.contains(f))
        && values.len() <= condition.max_arguments
}

fn parse_arguments(arguments: &[String]) -> CommandArguments {
    let mut values = Vec::new();
    let mut flags = HashSet::new();

    for argument in arguments {
        if argument.starts_with("--") && argument.len() >= 3 {
            match argument.find("=") {
                Some(index) => flags.insert(argument[2..index].to_lowercase()),
                None => flags.insert(argument[2..].to_lowercase()),
            };
        } else if !argument.starts_with("--") && argument.starts_with("-") && argument.len() >= 2 {
            if argument.len() >= 3 && &argument[2..3] == "=" {
                flags.insert(argument[1..2].to_lowercase());
            } else {
                for f in 1..argument.len() {
                    flags.insert(argument[f..f + 1].to_lowercase());
                }
            }
        } else {
            values.push(argument.clone());
        }
    }

    CommandArguments { values, flags }
}
