import dayjs from "dayjs";
dayjs().format();

export function titleCase(str) {
	return str.split(" ").map(w => w[0].toUpperCase() + w.substr(1).toLowerCase()).join(" ");
}

export function createArrayOfNumbers(n) {
	return [...Array(n)].map((_, i) => i + 1); //contoh n = 10 maka hasilnya [1,2,3,4,...,10]
}

export function checkObjectLength(obj) {
	//{} => return 0
	//{test:'a', demo: 'b'} => return 2
	return Object.entries(obj).length;
}

export function formatAmount(amount, currency = true) {
	if (currency) {
		const formatter = new Intl.NumberFormat("id-ID", {
			style: "currency",
			currency: "IDR"
		});
		if (amount === null) return "-";
		return formatter.format(amount).replace(/.00$/, "").replace(/,/g, ".");
	} else {
		return amount ? amount.toLocaleString("id-ID") : amount;
	}
}

export function formatDatetime(datetime) {
	return datetime ? dayjs(datetime).format("YYYY-MM-DD HH:mm:ss") : "-";
}

export function formatDate(datetime) {
	return datetime ? dayjs(datetime).format("YYYY-MM-DD") : "-";
}

export function currentDate(days) {
	return days ? dayjs().add(days, "day").format("YYYY-MM-DD") : dayjs().format("YYYY-MM-DD");
}

export function addAndFormatDate(arg1, arg2) {
	return dayjs().add(arg1, arg2).format("YYYY-MM-DD");
}

export function addAndFormatDatetime(arg1, arg2) {
	return dayjs().add(arg1, arg2).format("YYYY-MM-DD HH:mm:ss");
}
