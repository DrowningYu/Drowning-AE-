import os
import http.client
import json
import base64
import msvcrt
import sys
import requests
import zipfile
import shutil

def copy_file(src_file, dest_dir):
    """
    复制文件到目标目录，并在文件已存在时覆盖。
    :param src_file: 源文件路径
    :param dest_dir: 目标目录路径
    """
    try:
        # 检查源文件是否存在
        if not os.path.isfile(src_file):
            print(f"源文件不存在: {src_file}")
            return
        
        # 确保目标目录存在
        os.makedirs(dest_dir, exist_ok=True)
        
        # 构建目标文件路径
        dest_file_path = os.path.join(dest_dir, os.path.basename(src_file))
        
        # 复制文件并覆盖
        shutil.copy2(src_file, dest_file_path)
        print(f"文件已成功复制到: {dest_file_path}")
    
    except Exception as e:
        print(f"复制文件失败: {e}")






def copy_directory(src_dir, dest_dir):
    """
    复制整个文件夹，包括其中的所有文件和子文件夹。
    如果目标目录已存在，则覆盖它。
    :param src_dir: 源文件夹路径
    :param dest_dir: 目标文件夹路径
    """
    try:
        # 检查源目录是否存在
        if not os.path.isdir(src_dir):
            print(f"源目录不存在: {src_dir}")
            return

        # 如果目标目录已存在并且 Python 版本 < 3.8，则删除后再复制
        if os.path.exists(dest_dir):
            shutil.rmtree(dest_dir)

        # 递归复制文件夹及其内容
        shutil.copytree(src_dir, dest_dir, dirs_exist_ok=True)
        print(f"文件夹已成功复制到: {dest_dir}")

    except Exception as e:
        print(f"复制文件夹失败: {e}")
    return dest_dir

def rename_directory(old_name, new_name):
    """
    重命名目录
    :param old_name: 旧目录名称（包括路径）
    :param new_name: 新目录名称（包括路径）
    """
    try:
        if os.path.isdir(old_name):
            os.rename(old_name, new_name)
            print(f"目录已重命名: '{old_name}' -> '{new_name}'")
        else:
            print(f"目录不存在: {old_name}")
    except Exception as e:
        print(f"重命名失败: {e}")
    return new_name





def get_parent_directory(folder_path):
    # 获取上级目录
    parent_directory = os.path.dirname(folder_path)
    return parent_directory



def delete_file(file_path):
    """删除文件"""
    try:
        if os.path.isfile(file_path):
            os.remove(file_path)
            print(f"文件已删除: {file_path}")
        else:
            print(f"文件不存在: {file_path}")
    except Exception as e:
        print(f"删除文件失败: {e}")

def delete_non_empty_dir(dir_path):
    """删除非空目录"""
    try:
        if os.path.isdir(dir_path):
            shutil.rmtree(dir_path)
            print(f"非空目录已删除: {dir_path}")
        else:
            print(f"目录不存在: {dir_path}")
    except Exception as e:
        print(f"删除非空目录失败: {e}")


def unzip_file(zip_path, extract_path=None):

    # 如果没有指定解压路径，则解压到当前目录
    if extract_path is None:
        extract_path = os.path.dirname(zip_path)
    
    # 确保解压目录存在
    os.makedirs(extract_path, exist_ok=True)
    
    try:
        with zipfile.ZipFile(zip_path, 'r') as zip_ref:
            zip_ref.extractall(extract_path)
        print(f"Unzip successful, The file is saved as:: {extract_path}")
    except zipfile.BadZipFile:
        print("Unzip failed")
    except Exception as e:
        print(f"Unzip failed：{e}")
    return extract_path








# def download_github_repo(repo_url):
#     # 构造下载 URL（.zip 格式）
#     download_url = f"{repo_url}/archive/refs/heads/main.zip"
    
#     # 获取当前脚本所在目录
#     script_dir = os.path.dirname(os.path.abspath(__file__))
#     zip_filename = os.path.join(script_dir, "DrowningYu_AE_Tools.zip")
    
#     # 发送 HTTP 请求下载文件
#     response = requests.get(download_url)
    
#     # 检查请求是否成功
#     if response.status_code == 200:
#         with open(zip_filename, "wb") as file:
#             file.write(response.content)
#         print(f"Download successful, The file is saved as: {zip_filename}")
#     else:
#         print(f"download failed : {response.status_code}")
#     return zip_filename

def download_github_repo(repo_url):
    # 构造下载 URL（.zip 格式）
    download_url = f"{repo_url}/archive/refs/heads/main.zip"
    
    # 获取当前脚本所在目录
    script_dir = os.path.dirname(os.path.abspath(__file__))
    zip_filename = os.path.join(script_dir, "DrowningYu_AE_Tools.zip")
    
    # 发送 HTTP 请求下载文件，关闭 SSL 验证
    response = requests.get(download_url, verify=False)
    
    # 检查请求是否成功
    if response.status_code == 200:
        with open(zip_filename, "wb") as file:
            file.write(response.content)
        print(f"Download successful, The file is saved as: {zip_filename}")
    else:
        print(f"Download failed: {response.status_code}")
    return zip_filename






def fetch_github_file_content(owner, repo, path, branch="main"):
    conn = http.client.HTTPSConnection("api.github.com")
    api_path = f"/repos/{owner}/{repo}/contents/{path}?ref={branch}"
    headers = {"User-Agent": "Python-script"}
    conn.request("GET", api_path, headers=headers)
    response = conn.getresponse()
    
    if response.status == 200:
        data = response.read().decode("utf-8")
        json_data = json.loads(data)
        # 文件内容以 base64 编码存储
        content_base64 = json_data["content"]
        # 解码 base64 为文本
        content = base64.b64decode(content_base64).decode("utf-8")
        return content
    else:
        raise Exception(f"Failed to fetch file. Status code: {response.status}")


def readVersionFile():
    # 获取当前脚本所在的目录
    current_dir = os.path.dirname(__file__)
    
    # 指定上一级目录中的 version.txt 文件路径
    version_file_path = os.path.join(current_dir, "..", "version.txt")
    
    # 检查文件是否存在并读取内容
    if os.path.exists(version_file_path):
        try:
            with open(version_file_path, "r") as file:
                content = file.read()
                print("current version: " + content)
                return content
        except Exception as e:
            print(f"读取文件时出错: {e}")
    else:
        print("version.txt doesn't exist")
    return None


def list_directories_and_files(path,targetPath):
    try:
        # 遍历 path 下的第一层内容
        items = os.listdir(path)
        for item in items:
            item_path = os.path.join(path, item)
            if os.path.isdir(item_path):
                print(f"目录: {item}")
                if(item=='update'):
                    list_directories_and_files(path+'\\' +item,targetPath+'\\'+item)
                    continue
                copy_directory(path+'\\' +item, targetPath+'\\'+item)
            else:
                print(f"文件: {item}")
                copy_file(path+'\\' +item, targetPath)
    except FileNotFoundError:
        print(f"路径不存在: {path}")
    except Exception as e:
        print(f"遍历时出错: {e}")



if __name__ == '__main__':
    print("")
    print("")
    print("")
    print("")

    curVersionStr=readVersionFile()
    curVersion = list(map(int, curVersionStr.split(".")))
    owner = "DrowningYu"
    repo = "DrowningYu_AE_Tools"
    path = "DrowningYu/version.txt"

    newVersionStr=''
    try:
        newVersionStr = fetch_github_file_content(owner, repo, path)
    except Exception as e:
        print(e)
        sys.exit(0)
    newVersion= list(map(int, newVersionStr.split(".")))
    print("latest version:"+newVersionStr)

    flag=0
    if(newVersion[0]>curVersion[0]):
        flag=1

    elif(newVersion[1]>curVersion[1]):
        flag=1

    elif(newVersion[2]>curVersion[2]):
        flag=1

    
    if(flag==0):
        print("You are already on the latest version")
        print("Press any key to continue...")
        msvcrt.getch()
        sys.exit(0)
    cmd=input("update or not? (y/n)")
    if(cmd=='n'):
        sys.exit(0)
    elif(cmd=='y'):
        print("Downloading...")

    else:
        sys.exit(0)

    zipPath=download_github_repo("https://github.com/DrowningYu/DrowningYu_AE_Tools")
    mainPath=unzip_file(zipPath)+'\DrowningYu_AE_Tools-main'
    drowningYuPath=mainPath+'\DrowningYu'
    updatePath=get_parent_directory(mainPath)
    oldDrowningYuPath=get_parent_directory(updatePath)
    scriptUIPath=get_parent_directory(oldDrowningYuPath)

    # 示例用法
    copy_file(mainPath+'\DrowningYu.jsx', scriptUIPath)


    list_directories_and_files(drowningYuPath,oldDrowningYuPath)

    # temp = rename_directory(drowningYuPath,mainPath+'\\temp')
    # copy_directory(drowningYuPath, "C:\Windows\Temp")
    delete_file(zipPath)
    delete_non_empty_dir(mainPath)

    print("")
    print("更新成功 重新开启脚本界面生效")
    x=input("输入任意键继续")
    print(x)

