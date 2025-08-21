const { create } = require('@open-wa/wa-automate');

create({
    useChrome: true,  // يستخدم Chrome المدمج
    headless: true
}).then(client => start(client));

function start(client) {
    client.onMessage(async (message) => {
        const text = message.body.trim();

        if (text === "مرحبا" || text === "القائمة") {
            await client.sendButtons(
                message.from,
                "👋 أهلاً بك! اختر من القائمة:",
                [
                    { id: "customer_service", text: "خدمة العملاء" },
                    { id: "offers", text: "العروض الحالية" },
                    { id: "products", text: "المنتجات" }
                ],
                "اختر أحد الخيارات بالضغط على الزر 👇"
            );
        }

        // زر خدمة العملاء
        if (message.selectedButtonId === "customer_service") {
            await client.sendButtons(
                message.from,
                "📞 خدمة العملاء:",
                [
                    { id: "call", text: "📞 رقم الهاتف" },
                    { id: "email", text: "📧 البريد الإلكتروني" },
                    { id: "main_menu", text: "🔙 رجوع للقائمة الرئيسية" }
                ],
                "اختر طريقة التواصل:"
            );
        }

        // زر العروض
        if (message.selectedButtonId === "offers") {
            await client.sendButtons(
                message.from,
                "🎉 العروض المتاحة:",
                [
                    { id: "summer_offer", text: "🔥 عرض الصيف" },
                    { id: "weekend_offer", text: "🎊 عرض نهاية الأسبوع" },
                    { id: "main_menu", text: "🔙 رجوع للقائمة الرئيسية" }
                ],
                "اختر العرض 👇"
            );
        }

        // زر المنتجات
        if (message.selectedButtonId === "products") {
            await client.sendButtons(
                message.from,
                "🛒 المنتجات:",
                [
                    { id: "electronics", text: "💻 الإلكترونيات" },
                    { id: "clothes", text: "👕 الملابس" },
                    { id: "home", text: "🏠 الأدوات المنزلية" },
                    { id: "main_menu", text: "🔙 رجوع للقائمة الرئيسية" }
                ],
                "اختر القسم 👇"
            );
        }

        // الردود الفرعية
        if (message.selectedButtonId === "call") await client.sendText(message.from, "📞 رقم خدمة العملاء: 920000000");
        if (message.selectedButtonId === "email") await client.sendText(message.from, "📧 البريد: support@example.com");
        if (message.selectedButtonId === "summer_offer") await client.sendText(message.from, "🔥 عرض الصيف: خصم 30% على جميع المنتجات!");
        if (message.selectedButtonId === "weekend_offer") await client.sendText(message.from, "🎊 عرض نهاية الأسبوع: اشتر 1 واحصل على 1 مجاناً!");
        if (message.selectedButtonId === "electronics") await client.sendText(message.from, "💻 الإلكترونيات: لابتوبات، هواتف، سماعات...");
        if (message.selectedButtonId === "clothes") await client.sendText(message.from, "👕 الملابس: قمصان، بناطيل، أحذية...");
        if (message.selectedButtonId === "home") await client.sendText(message.from, "🏠 الأدوات المنزلية: أواني، أثاث صغير...");

        // رجوع للقائمة
        if (message.selectedButtonId === "main_menu") {
            await client.sendButtons(
                message.from,
                "👋 رجعت للقائمة الرئيسية:",
                [
                    { id: "customer_service", text: "خدمة العملاء" },
                    { id: "offers", text: "العروض الحالية" },
                    { id: "products", text: "المنتجات" }
                ],
                "اختر أحد الخيارات بالضغط على الزر 👇"
            );
        }
    });
}
