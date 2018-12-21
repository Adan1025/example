一、安装
1.1、chrome： chromedriver.exe

放入chrome安装目录下，或者放入工程目录下。配置环境变量(未验证是否必须)

下载地址：

1.2、firefox： geckodriver.exe

放入firefox安装目录下，并配置环境变量(path到安装目录即可)


二、 对浏览器的操作
from selenium import webdriver
# 实例化driver
driver = webdriver.Chrome()
# 窗口最大化
driver.maximize_window()
# 自定义窗口大小
driver.set_window_size(1200, 900)
# 打开连接
driver.get('http://blog.qualc.cn/')
# 关闭当前窗口
driver.close()
# 关闭所有窗口
driver.quit()


2.1 多窗口切换
# 获取当前窗口句柄
currHandle = driver.current_window_handle
# 获取所有窗口句柄
allHandles = driver.window_handles
for handle in allHandles:
    if handle != currHandle:
        # 切换到指定窗口
        driver.switch_to_window(handle)
        # 关闭新窗口
        driver.close()
        # 回到原来窗口
        driver.switch_to_window(currHandle)


2.2 iframe切换
# 切入指定iframe文档 下列两种方法均可
driver.switch_to.frame(driver.find_element_by_id('iframeid'))
driver.switch_to_frame(driver.find_element_by_id('iframeid'))
# 切换回主文档
driver.switch_to.default_content()
driver.switch_to_default_content()
# 切换到上一级iframe 如果当前已是主文档，则无效果
driver.switch_to.parent_frame()


2.3 弹出窗
# 获取alert对象  下列两种方法均可
alert = driver.switch_to_alert()
alert = driver.switch_to.alert
# 确定
alert.accept()
# 取消
alert.dismiss()
# 获取文本
alert.getText()

2.4 导航
# 后退
driver.back()
# 前进
driver.forward()
# 刷新
driver.refresh()

2.5 cookie
# 获取所有cookie
driver.get_cookies()
# 获取指定cookie 返回字典的key为username的cookie
driver.get_cookie('username')
# 添加cookie
driver.add_cookie({'key':'username','value': '天冰'});

三、对dom元素的操作
3.1 元素定位
from selenium.webdriver.common.by import By
driver.find_element_by_id('id')
driver.find_element_by_class_name('className')
driver.find_element_by_css_selector('.className>li')
driver.find_element_by_name('password')
# 根据全文本查询
driver.find_element_by_link_text('立即登录')
# 根据文本模糊查询
driver.find_element_by_partial_link_text('即登')
driver.find_element_by_tag_name('button')
driver.find_element_by_xpath('//div[@id="id"]')
# BY.xxx查询
driver.find_element(By.ID('id'))

# 获取一组元素 返回一个数组
driver.find_elements_by_id('id')
# ...同上区别在于element 和 elements
xpath查询不完全操作
# 根据tag+属性查询
driver.find_element_by_xpath('//div[@id="id"]')
# 根据tag+函数查询
driver.find_element_by_xpath('//div[text()="id"]')
# 包含查询 contains() 查询a元素中href值包含articleInfo的元素
driver.find_element_by_xpath('//a[contains(@href, "articleInfo")]')
# 相对定位 如下例，找到label，找到它的父级下的input(其实就是同级元素)
driver.find_element_by_xpath('//label[@for="password"]/../input[@id=password]')
# 层级查找
driver.find_element_by_xpath('//div[@id="id"]/a')
其他选择器
child 选取当前节点的所有子元素
parent 选取当前节点的父节点
descendant选取当前节点的所有后代元素（子、孙等）
ancestor 选取当前节点的所有先辈（父、祖父等）
descendant-or-self选取当前节点的所有后代元素（子、孙等）以及当前节点本身
ancestor-or-self 选取当前节点的所有先辈（父、祖父等）以及当前节点本身
preceding-sibling选取当前节点之前的所有同级节点
following-sibling选取当前节点之后的所有同级节点
preceding 选取文档中当前节点的开始标签之前的所有节点
following 选取文档中当前节点的结束标签之后的所有节点
self 选取当前节点
attribute 选取当前节点的所有属性
namespace选取当前节点的所有命名空间节点
# 如 查找id的之后的所有div元素
driver.find_element_by_xpath('//div[@id="id"]/following-sibling::div')
3.2 元素操作
以下为基本操作 但不是所有元素通用
element = driver.find_element_by_id('id')
# 基本操作
# 获取文本，相当于innerText
element.text
# 点击操作
element.click()
# 提交from表单可以用submit()
element.submit()
# 获取某个属性值
element.get_attribute('id')
3.2.1 input
element.send_keys(u'为input文本框赋值')
# 清空
element.clear()


3.2.2 select
原生
# 选中某项  原生需要循环去获取
option = driver.find_element_by_tag_name(
    'select').find_element_by_tag_name('option')
for x in option:
    if x.get_attribute('value') == 'value':
        x.click()
借助Select类
from selenium.webdriver.support.select import Select
element = Select(driver.find_element_by_tag_name('select'))
# 根据下标选中 从0开始
element.select_by_index(0)
# 根据值选中
element.select_by_value('1')
# 根据文本选中
element.select_by_visible_text('男')
# 返回选中的第一个值
element.first_selected_option
# 返回选中的所有值
element.all_selected_options

# 以下针对多选文本框
# 取消所有选项
element.deselect_all()
# 取消对应index选项
element.deselect_by_index(0)
# 取消对应value选项
element.deselect_by_value('1')
# 取消对应文本选项
element.deselect_by_visible_text('男')
# 通过xpath操作options
driver.find_element_by_xpath('//*[@id="te"]/option[1]').click()
driver.find_element_by_xpath('//option[@value=2]').click()


3.2.3 radio
element.clear()
# 判断某个单选项是否已经被选择
element.is_selected()


3.2.4 checkbox
element.is_selected()
# 判断按钮是否enable
element.is_enabled()


3.2.5 button
element.is_enabled()


四、等待
4.1 强制等待 单位秒
from time import sleep
sleep(5)


4.2 隐性等待
超时时间30秒， 会一直等待页面加载完成，如果request有资源一直加载，则一直等待
driver.implicitly_wait(30)


4.3 显性等待
超时时间20秒 没0.5秒查询一次， 一直等到元素获取到或者超时 为止
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
WebDriverWait(driver, 20, 0.5).until(
    EC.presence_of_element_located((By.ID, 'id')))


五、 执行js脚本
driver.execute_script('alert("我执行了一个js脚本")')
