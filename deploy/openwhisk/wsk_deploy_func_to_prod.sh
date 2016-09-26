#!/bin/bash
./wsk_set_env_prod.sh
action=$1
func_name=$2
func_file_name=$3
wsk_cmd=$(echo 'wsk action '$action' --kind nodejs:6')
mkdir -p ./release/prod
func_rel_file_name=$(echo $func_file_name | sed 's/.*\///')
func_rel_file_name=$(echo $func_rel_file_name | sed 's/\.[^.]*$//')
func_tmp_file_name=$(echo './release/prod/__'$func_rel_file_name'__.js')
cat $func_file_name | pug -p $func_file_name > $func_tmp_file_name
while read -r line; do
	param_name=$(echo $line | sed 's/^.*\:[ ]*\(.*\)$/\1/')
	if [ -n "$param_name" ]
	then
		param_value=$(cat ../../params/openwhisk/default_params_prod.txt | sed -n 's/^'$param_name'[^=]*=[ ]*\(.*\)$/\1/p')
		param_value=$(echo $param_value | sed "s/\'/\"/g")
		wsk_cmd=$(echo $wsk_cmd" --param "$param_name "'"$param_value"'")
	fi
done <<< "$(grep -E '\$DefaultParam\:[ ]*.*' $func_file_name)"
wsk_cmd=$(echo $wsk_cmd $func_name $func_tmp_file_name)
echo $wsk_cmd
eval $wsk_cmd