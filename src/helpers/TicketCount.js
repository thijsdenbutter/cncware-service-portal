function TicketsCount(tickets, status) {
    return tickets.filter(ticket => ticket.status === status).length;
}
export default TicketsCount;