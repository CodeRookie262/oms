import { Icon, Menu } from "antd";
import { formatMessage, getLocale, setLocale } from "umi-plugin-react/locale";
import React from "react";
import classNames from "classnames";
import HeaderDropdown from "../HeaderDropdown";
import styles from "./index.less";

let TextKey = "zh-CN";
const SelectLang = (props) => {
	const { className } = props;
	const selectedLang = getLocale();

	const changeLang = ({ key }) => {
		setLocale(key, false);
		sessionStorage.setItem("TextKey", key);
	};

	const locales = ["zh-CN", "zh-TW", "en-US", "pt-BR"];
	const languageLabels = {
		"zh-CN": "简体中文",
		"zh-TW": "繁体中文",
		"en-US": "English",
		"pt-BR": "Português"
	};
	const languageIcons = {
		"zh-CN": "🇨🇳",
		"zh-TW": "🇭🇰",
		"en-US": "🇬🇧",
		"pt-BR": "🇧🇷"
	};
	const langMenu = (
		<div>
			<Menu
				className={styles.menu}
				selectedKeys={[selectedLang]}
				onClick={changeLang}
			>
				{locales.map((locale) => (
					<Menu.Item key={locale}>
						<span role="img" aria-label={languageLabels[locale]}>
							{languageIcons[locale]}
						</span>{" "}
						{languageLabels[locale]}
					</Menu.Item>
				))}
			</Menu>
		</div>
	);
	return (
		<HeaderDropdown overlay={langMenu} placement="bottomRight">
			<span className={classNames(styles.dropDown, className)}>
				<Icon
					type="global"
					title={formatMessage({
						id: "navBar.lang"
					})}
				/>

				<span style={{ marginLeft: "5px" }}>
					{locales.map((locale) => {
						if (
							!sessionStorage.getItem("TextKey")
								? TextKey === locale
								: sessionStorage.getItem("TextKey") === locale
						) {
							return <span key={locale}>{languageLabels[locale]}</span>;
						}
					})}
				</span>
			</span>
		</HeaderDropdown>
	);
};

export default SelectLang;
