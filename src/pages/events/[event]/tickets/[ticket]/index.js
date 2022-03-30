import React from 'react';
import {print} from 'graphql';
import Page from '../../../../../components/Page';
import {useFetcher} from '../../../../../fetch';
import {getTicket} from './ticket.gql';
import Content from '@codeday/topo/Molecule/Content';
import Text, {Heading} from '@codeday/topo/Atom/Text';
import {TicketTypeBadge} from "../../../../../components/Ticket";
import Box, {Flex} from '@codeday/topo/Atom/Box'
import Breadcrumbs from "../../../../../components/Breadcrumbs";
import Alert, {GoodAlert} from "../../../../../components/Alert";
import {getSession} from "next-auth/react";
import {DeleteTicketModal, UpdateTicketModal} from "../../../../../components/forms/Ticket";
import Masonry, {ResponsiveMasonry} from 'react-responsive-masonry';
import InfoBox from "../../../../../components/InfoBox";
import { Email, DevicePhone, Ticket, IdCard, UiAdd } from "@codeday/topocons/Icon"
import Confidential from "../../../../../components/Confidential";
import {CreateGuardianModal, DeleteGuardianModal, UpdateGuardianModal} from "../../../../../components/forms/Guardian";
import moment from "moment";

export default function TicketPage({ticket}) {
    if (!ticket) return <Page/>
    return (
        <Page>
            <Breadcrumbs event={ticket.event} ticket={ticket}/>
            <Confidential />
            <Heading d="inline"><Ticket />{ticket.firstName} {ticket.lastName}</Heading>
            <TicketTypeBadge ml={2} ticket={ticket}/>
            <UpdateTicketModal ticket={ticket}/>
            <DeleteTicketModal ticket={ticket}/>
            <ResponsiveMasonry>
                <Masonry>
                    <InfoBox heading="Attendee details">
                        <Email />{ticket.email} <br/>
                        <DevicePhone />{ticket.phone} <br/>
                        <IdCard /> {ticket.age} years old
                    </InfoBox>
                    {ticket.age < 18? (
                        <InfoBox
                            heading={<>
                                <Text d="inline">Guardian details</Text>
                                {ticket.guardian? <>
                                        <UpdateGuardianModal guardian={ticket.guardian}/>
                                    <DeleteGuardianModal guardian={ticket.guardian} />
                                </>: <CreateGuardianModal ticket={ticket} d="inline"><UiAdd /></CreateGuardianModal>}
                            </>}>
                            {ticket.guardian? (
                                    <>
                                        <IdCard />{ticket.guardian.firstName} {ticket.guardian.lastName} <br/>
                                        <Email />{ticket.guardian.email} <br/>
                                        <DevicePhone />{ticket.guardian.phone} <br/>
                                    </>) : (
                                        <Alert>No Guardian Info</Alert>
                            )}
                                </InfoBox>
                                ): null}
                    <InfoBox heading="Payment Details">
                        Registered on: {moment(ticket.createdAt).format('LL')} <br/>
                        Promo Code used: {ticket.promoCode?.code || 'N/A'} <br/>
                        Payment intent ID: {ticket.payment?.stripePaymentIntentId || 'N/A'}
                    </InfoBox>
                        </Masonry>
                        </ResponsiveMasonry>
                        </Page>
                        );
                        }

                        export async function getServerSideProps({req, query: {event: eventId, ticket: ticketId}}) {
                        const session = await getSession({req})
                        const fetch = useFetcher(session);
                        if (!session) return {props: {}}
                        const ticketResult = await fetch(getTicket, {data: {id: ticketId}})
                        const ticket = ticketResult?.clear?.ticket
                        if (!ticket) return {
                        redirect: {
                        destination: `/events/${eventId}/tickets`,
                        permanent: false
                    }
                    }
                        return {
                        props: {
                        ticket: ticket
                    }
                    }
                    }
