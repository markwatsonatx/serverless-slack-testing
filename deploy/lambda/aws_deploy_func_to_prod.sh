#!/bin/bash
absPath(){
    if [[ -d "$1" ]]; then
        cd "$1"
        echo "$(pwd -P)"
    else 
        cd "$(dirname "$1")"
        echo "$(pwd -P)/$(basename "$1")"
    fi
}
source ./aws_set_env_prod.sh
action=$1
func_name=$2
func_file_name=$3
mkdir -p ./release/prod
func_rel_file_name=$(echo $func_file_name | sed 's/.*\///')
func_rel_file_name=$(echo $func_rel_file_name | sed 's/\.[^.]*$//')
func_tmp_file_name=$(echo './release/prod/__'$func_rel_file_name'__.js')
func_tmp_file_name=$(echo $(dirname $(absPath ${BASH_SOURCE[0]}))'/release/prod/__'$func_rel_file_name'__.js')
if [ "$action" == "create-function" ]
then
	aws_cmd=$(echo 'aws lambda '$action' --function-name '$func_name' --role '$DEFAULT_LAMBDA_ROLE_ARN' --runtime nodejs --handler __'$func_rel_file_name'__.handler')
else
	aws_cmd=$(echo 'aws lambda '$action' --function-name '$func_name)
fi
pushd $(dirname $(absPath $func_file_name))
j2 $func_file_name > $func_tmp_file_name
popd
func_tmp_file_zip=$(echo $func_tmp_file_name'.zip')
rm -rf $func_tmp_file_zip
zip -j $func_tmp_file_zip $func_tmp_file_name
# while read -r line; do
# 	param_name=$(echo $line | sed 's/^.*\:[ ]*\(.*\)$/\1/')
# 	if [ -n "$param_name" ]
# 	then
# 		param_value=$(cat ../../params/openwhisk/default_params_prod.txt | sed -n 's/^'$param_name'[^=]*=[ ]*\(.*\)$/\1/p')
# 		param_value=$(echo $param_value | sed "s/\'/\"/g")
# 		aws_cmd=$(echo $aws_cmd" --param "$param_name "'"$param_value"'")
# 	fi
# done <<< "$(grep -E '\$DefaultParam\:[ ]*.*' $func_file_name)"
aws_cmd=$(echo $aws_cmd --zip-file fileb://$func_tmp_file_zip)
echo $aws_cmd
eval $aws_cmd