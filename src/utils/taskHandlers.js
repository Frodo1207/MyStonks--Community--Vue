export const handleGoTgTask = async (task, completeTask, refreshTask) => {
    window.open('https://t.me/STONKSOPEN');
    if (task.special_action === 'go_tg') {
        await completeTask(task.id);
        await refreshTask();
    }
};

export const handleTgBindTask = async (task, completeTask, refreshTask) => {
    const tgid = localStorage.getItem("tg_id");
    if (tgid !== "0") {
        await completeTask(task.id);
        alert("完成任务");
        await refreshTask();
    } else {
        alert("请先连接 Telegram");
    }
};

export const handleGoXStonksTask = async (task, completeTask, refreshTask) => {
    window.open('https://x.com/MyStonks_Org');
    await completeTask(task.id);
    await refreshTask();
};

export const handleFirstBindWalletTask = async (task, completeTask, refreshTask) => {
    await completeTask(task.id);
    await refreshTask();
};

export const handleStonksTradeTask = async () => {
    try {
        const res = await getStonksTradeRes();
        if (res.is_trade) {
            alert('交易验证成功');
        } else {
            alert('未检测到交易记录');
        }
    } catch (error) {
        console.error('验证失败', error);
        alert('验证失败，请重试');
    }
};

export const handleDefaultTask = async (task, allNewbieTasksCompleted, dailyTasks, otherTasks) => {
    const isRestrictedTask = [...dailyTasks, ...otherTasks].some(t => t.id === task.id);
    if (!allNewbieTasksCompleted && isRestrictedTask) {
        alert('请先完成所有新手任务，再进行后续任务～');
        return false;
    }
    return true;
};
