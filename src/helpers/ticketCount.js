function ticketsCount(tickets, ticketStatuses, status) {

    const target = ticketStatuses.find(ticketStatus => ticketStatus.name === status);

    if (!target) return 0;
    return tickets.filter(ticket => ticket.status.id === target.id).length;
}
export default ticketsCount;