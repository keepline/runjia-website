# 润佳精造 · 企业官网第一版

青岛润佳精造设计装饰有限公司的静态、多页、响应式官网。无运行时框架依赖，无数据库、账号或采集表单，适合 GitHub Pages 预览。

## 本版范围

- 首页与六个独立服务详情页：地下室防水防潮系统、屋面防水系统、窗户防水系统、鱼池泳池防水系统、高定美缝系列、全屋美容胶系列。
- 关于润佳、品牌授权、项目案例说明、联系方式及隐私说明。
- 桌面导航、可折叠移动导航、服务分类筛选、拨号链接、复制电话号码。
- 中英文辅助排版、原创建筑节点示意图、自包含建筑概念意向图、移动端底部联系入口。
- 适配 GitHub Pages 项目子路径，所有站内资源使用相对链接。
- 2026 年授权期展示；脚本按中国标准时间判断是否到期，不把到期授权继续显示为当前有效。

## 本地开发

需要 Node.js 22 或更新版本（验证环境为 Node.js 24）。没有运行时或开发安装依赖。

```sh
npm ci --ignore-scripts
npm run check
npm run build
npm test
npm run preview
```

默认地址 `http://127.0.0.1:4173/`。修改 `src/` 后重新构建，再刷新页面。

模拟 GitHub Pages 的仓库子路径：

```sh
BASE_PATH=/runjia-website PORT=4173 npm run preview
```

访问 `http://127.0.0.1:4173/runjia-website/`。需要从同一网络的其他设备预览时可显式设置 `HOST=0.0.0.0`；默认仅绑定本机。

## 代码与发布目录

```text
src/content.mjs       公司事实、服务文案、沟通流程
src/templates.mjs     静态页面模板
src/styles.css        响应式样式
src/site.js           渐进增强交互
assets/               原创意向图、站点图标及生成的静态样式与脚本
scripts/build.mjs     构建 dist/，无第三方依赖
scripts/serve.mjs     本地预览
scripts/sync-pages.mjs 将 dist/ 同步到仓库根目录
scripts/public-tree.mjs 导出经筛选的纯文本 Git 树清单
tests/                页面与交互逻辑自动测试
docs/                 事实边界与验收说明
dist/                 本地构建目录，不提交
index.html、about/、services/ 等  为 Pages 根目录保留的构建产物
```

修改 `src/` 而非根目录生成的 HTML。每次修改后运行：

```sh
npm run prepare:pages
git add .
git commit -m "Update Runjia website"
```

`prepare:pages` 会运行语法检查、构建、测试，再把产物同步至仓库根目录。GitHub CI 检查根目录产物是否与源码一致。

## GitHub Pages

此仓库为“源码 + 预构建静态文件”布局，不需要服务器构建或后端。

1. 在已授权的 GitHub 仓库中提交完整文件。
2. GitHub Settings → Pages → Build and deployment，选择 Deploy from a branch。
3. 选择 `main` 与 `/(root)`，保存。
4. 等待 Pages 发布成功，再检查 GitHub 实际返回的 URL。

对名为 `runjia-website` 的项目仓库，预期地址形式为 `https://<owner>.github.io/runjia-website/`。这只是 URL 格式示例，必须在发布成功后验证实际地址，不能据此声称已上线。

`.nojekyll` 保留原始静态文件，不让 Jekyll 处理。本版没有 custom domain/CNAME，也没有自动部署脚本；CI 只读验证，不配置仓库或访问权限。

当传输工具需要纯文本 Git 树时，可运行 `npm run export:tree`，在仓库的上一级生成 `runjia-website-public-tree.json`。清单包含源码、文档与根目录静态产物，不包含 Git 内部数据、原始授权材料、客户资料、截图、原始 WebP、环境变量或秘钥。

## 素材与事实边界

- 主视觉是为本网站生成的建筑概念意向图，页面已标明“AI 生成，非自有项目案例”。不代表实际已施工项目。
- `assets/hero-architecture.svg` 是自包含 SVG 包装，内部嵌入 WebP。约 455 KiB，不加载外部图片、字体或 CDN。包装方式是为了允许纯文本 Git 树传输；所有内容均为站点资产。
- 服务节点 SVG 为概念性示意，不是施工图，详情页已明确标注。
- 暂无正式 Logo；当前为文字品牌与原创几何图形组合，属于本版视觉方案，待品牌确认后可替换。
- 自有项目案例尚未提供，因此案例页明确留白，不使用供应商案例充当自有成果。
- 未公开完整授权证书图片或原始客户资料。授权文字严格限定于已确认的 Kerakoll 防水防潮系列产品施工服务代理商、区域与日期。
- 不虚构资质、工龄、项目数量、客户评价、质保期限、效果保证或独家关系。
- 未填写未经确认的地址、微信号、邮箱、备案号、营业时间或报价。

详见 `docs/content-boundaries.md` 与 `docs/QA.md`。

## 第一版之后

此版本仅是企业官网与预览基础，**不包含**管理后台、客户项目中心、施工进度、资料上传、员工端、在线咨询提交或小程序。这些功能需要后端、认证、权限、数据存储、审计和隐私流程，不能仅依赖 GitHub Pages。

下一阶段可保持本静态站作为官网前端，在单独的非公开后端项目中建设管理功能。新增数据收集、账号、上传、通知或支付前，应先确认用途、权限、托管位置与安全方案。不要把客户资料、账号或密钥加入这个公开前端仓库。

正式投放前还应确认品牌标识、最终文案与授权续期流程，补充可公开案例，并根据实际域名和托管地区核实适用的备案及合规要求。本仓库不作合规完成声明。
