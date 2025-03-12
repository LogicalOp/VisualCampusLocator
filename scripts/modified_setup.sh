#!/bin/bash
readonly ARGS="$@"  # Reset using https://stackoverflow.com/a/4827707
readonly PROGNAME=$(basename $0)
readonly PROGPATH=$(realpath $(dirname $0))

# Internal variables
env_name="anyloc"   # Name of the environment
exec_name="conda"           # Executable
dry_run="false"     # 'true' or 'false'
ask_prompts="true"  # 'true' or 'false'
dev_tools="false"   # 'true' or 'false'
warn_exit="true"    # 'true' or 'false'

# Output formatting
warn_msg_fmt="\e[1;33m"    # Bold yellow
fatal_msg_fmt="\e[1;31m"   # Bold red
debug_msg_fmt="\e[0;94m"   # Light blue
info_msg_fmt="\e[1;37m"    # Bold white
command_msg_fmt="\e[0;36m" # Cyan

# Wrapper printing functions
echo_debug () {
    echo -ne $debug_msg_fmt
    echo $@
    echo -ne "\e[0m"
}
echo_info () {
    echo -ne $info_msg_fmt
    echo $@
    echo -ne "\e[0m"
}
echo_warn () {
    echo -ne $warn_msg_fmt
    echo $@
    echo -ne "\e[0m"
}
echo_fatal () {
    echo -ne $fatal_msg_fmt
    echo $@
    echo -ne "\e[0m"
}
echo_command () {
    echo -ne $command_msg_fmt
    echo $@
    echo -ne "\e[0m"
}

# Ensure installation can happen
if [ -x "$(command -v mamba)" ]; then   # If mamba found
    echo_debug "Found mamba"
    exec_name="mamba"
elif [ -x "$(command -v conda)" ]; then # If conda found
    echo_debug "Found conda (couldn't find mamba)"
    exec_name="conda"
else
    echo_fatal "Could not find mamba or conda! Install, source, and activate it."
    exit 127
fi

# Ensure conda is initialized in this script
# Adjust the path if necessary
source /usr/local/home/u200298/miniconda3/etc/profile.d/conda.sh  # Update if needed

# Check if the conda environment exists
if ! conda env list | grep -q "^$env_name"; then
    echo_warn "Conda environment '$env_name' does not exist."
    echo_info "Creating environment '$env_name'..."
    $exec_name create -n $env_name python=3.9 -y  # Create the environment with Python 3.9
else
    echo_debug "Conda environment '$env_name' exists."
fi

# Activate the conda environment
echo_info "Activating conda environment '$env_name'..."
conda activate $env_name

# Check if environment is activated correctly
if [[ "$CONDA_DEFAULT_ENV" != "$env_name" ]]; then
    echo_fatal "Failed to activate conda environment '$env_name'."
    exit 1
fi

# Proceed with further commands...
echo_info "Environment '$env_name' activated successfully."

# Confirm environment
echo_info "Using environment: $CONDA_DEFAULT_ENV"
echo_info "Python: $(which python)"
echo_debug "Python version: $(python --version)"
echo_info "Pip: $(which pip)"
echo_debug "Pip version: $(pip --version)"

if [ $ask_prompts == true ]; then
    read -p "Continue? [Ctrl+C to exit, enter to continue]"
elif [ $ ask_prompts == "false" ]; then
    echo_info "Continuing..."
fi

# Install packages
start_time=$(date)
start_time_secs=$SECONDS

echo_debug "---- Start time: $start_time ----"
echo_info "---- Install core packages ----"
# Use $@ to reset arguments
$exec_name install jupyter $@
$exec_name install matplotlib $@
$exec_name install pytorch torchvision torchaudio cudatoolkit=11.8 -c pytorch $@
$exec_name install -c conda-forge opencv $@
$exec_name install pytorch-cuda=11.8 -c pytorch -c nvidia $@
$exec_name install -c conda-forge onnx $@
$exec_name install -c conda-forge natsort $@
$exec_name install -c conda-forge tyro $@

# Finish install
end_time=$(date)
end_time_secs=$SECONDS
echo_debug "---- End time: $end_time ----"
dur=$(( $end_time_secs - $start_time_secs ))
_d=$(( dur/3600/24 ))   # Days!
echo_info "---- Environment setup took (d-HH:MM:SS): \
        $_d-`date -d@$dur -u +%H:%M:%S` ----"
echo_info "----- Environment $CONDA_DEFAULT_ENV has been setup -----"
echo_debug "Starting time: $start_time"
echo_debug "Ending time: $end_time"