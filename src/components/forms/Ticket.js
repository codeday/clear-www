import React, { useState } from 'react';
import Form from '@rjsf/chakra-ui';
import {
  Box, Button, Heading, Text,
} from '@codeday/topo/Atom';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import * as Icons from '@codeday/topocons';
import { Icon } from '@chakra-ui/react';
import { useToasts } from '@codeday/topo/utils';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useColorModeValue } from '@codeday/topo/Theme';
import validator from '@rjsf/validator-ajv6';
import { CreateTicketMutation, DeleteTicketMutation, UpdateTicketMutation } from './Ticket.gql';
import { useFetcher } from '../../fetch';

export const ticketTypeEnum = [
  {
    type: 'string',
    title: 'Student',
    enum: ['STUDENT'],
  },
  {
    type: 'string',
    title: 'Teacher',
    enum: ['TEACHER'],
  },
  {
    type: 'string',
    title: 'VIP',
    enum: ['VIP'],
  },
  {
    type: 'string',
    title: 'Mentor',
    enum: ['MENTOR'],
  },
  {
    type: 'string',
    title: 'Judge',
    enum: ['JUDGE'],
  },
  {
    type: 'string',
    title: 'Staff',
    enum: ['STAFF'],
  },
];

const schema = {
  type: 'object',
  properties: {
    firstName: {
      type: 'string',
      title: 'First Name',
    },
    lastName: {
      type: 'string',
      title: 'Last Name',
    },
    email: {
      type: 'string',
      title: 'Email',
    },
    phone: {
      type: 'string',
      title: 'Phone',
    },
    whatsApp: {
      type: 'string',
      title: 'WhatsApp',
    },
    age: {
      type: 'integer',
      title: 'Age',
    },
    type: {
      type: 'string',
      title: 'Type',
      default: 'STUDENT',
      anyOf: ticketTypeEnum,
    },
    username: {
      type: 'string',
      title: 'Username',
    },
  },
  required: ['firstName', 'lastName'],
};

const uiSchema = {
  username: {
    'ui:help': 'Username from account.codeday.org. RECOMMENDED FOR STAFF as this affects how you are displayed to the public on event pages.',
  },
};

export function CreateTicketModal({ event, children, ...props }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(/* if you need to set default values, do so here */);
  const { data: session } = useSession();
  const fetch = useFetcher(session);
  const [loading, setLoading] = useState(false);
  const { success, error } = useToasts();
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const router = useRouter();

  return (
    <Box {...props}>
      <Button onClick={onOpenModal}>{children || <><Icon mr={2} as={Icons.UiAdd} />Add Ticket</>}</Button>
      <Modal open={open} onClose={onCloseModal} center styles={{ modal: { background: useColorModeValue('white', 'var(--chakra-colors-gray-1100)') } }}>
        <Heading>Create Ticket</Heading>
        <Form
          validator={validator}
          uiSchema={uiSchema}
          schema={schema}
          formData={formData}
          onChange={(data) => setFormData(data.formData)}
        >
          <Button
            isLoading={loading}
            disabled={loading}
            onClick={async () => {
              setLoading(true);
              try {
                await fetch(CreateTicketMutation, {
                  data: {
                    ...formData,
                    event: {
                      connect: {
                        id: event.id,
                      },
                    },
                  },
                });
                await router.replace(router.asPath);
                success('Ticket Created');

                onCloseModal();
              } catch (ex) {
                error(ex.toString());
              }
              setLoading(false);
            }}
          >Submit
          </Button>
        </Form>
      </Modal>
    </Box>
  );
}

export function UpdateTicketModal({ ticket, children, ...props }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(ticket);
  const { data: session } = useSession();
  const fetch = useFetcher(session);
  const [loading, setLoading] = useState(false);
  const { success, error } = useToasts();
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const router = useRouter();

  function formDataToUpdateInput(formData) {
    const ret = {};
    Object.keys(schema.properties).map((key) => {
      if (formData[key] !== ticket[key]) ret[key] = { set: formData[key] };
    });
    return ret;
  }

  return (
    <Box display="inline" {...props}>
      <Button display="inline" onClick={onOpenModal}>{children || <Icons.UiEdit />}</Button>
      <Modal open={open} onClose={onCloseModal} center styles={{ modal: { background: useColorModeValue('white', 'var(--chakra-colors-gray-1100)') } }}>
        <Form
          validator={validator}
          uiSchema={uiSchema}
          schema={schema}
          formData={formData}
          onChange={(data) => setFormData(data.formData)}
        >
          <Button
            isLoading={loading}
            disabled={loading}
            onClick={async () => {
              setLoading(true);
              try {
                await fetch(UpdateTicketMutation, {
                  where: { id: ticket.id },
                  data: formDataToUpdateInput(formData),
                });
                await router.replace(router.asPath);
                success('Ticket Updated');
                onCloseModal();
              } catch (ex) {
                error(ex.toString());
              }
              setLoading(false);
            }}
          >Submit
          </Button>
        </Form>
      </Modal>
    </Box>
  );
}

export function DeleteTicketModal({ ticket, children, ...props }) {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const fetch = useFetcher(session);
  const [loading, setLoading] = useState(false);
  const { success, error } = useToasts();
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const router = useRouter();

  return (
    <Box display="inline" {...props}>
      <Button display="inline" onClick={onOpenModal}>{children || <Icons.UiTrash />}</Button>
      <Modal open={open} onClose={onCloseModal} center styles={{ modal: { background: useColorModeValue('white', 'var(--chakra-colors-gray-1100)') } }}>
        <Heading>Remove Ticket</Heading>
        <Text>Are you sure you want to delete this Ticket?
          <br />
          There's no turning back!
        </Text>
        <Button
          colorScheme="red"
          disabled={loading}
          isLoading={loading}
          onClick={async () => {
            setLoading(true);
            try {
              await fetch(DeleteTicketMutation, { where: { id: ticket.id } });
              await router.replace(router.asPath);
              success('Ticket Deleted');
              onCloseModal();
            } catch (ex) {
              error(ex.toString());
            }
            setLoading(false);
          }}
        ><Icons.UiTrash /><b>Delete Ticket</b>
        </Button>
        <Button onClick={onCloseModal}><Icons.UiX />Cancel</Button>
      </Modal>
    </Box>
  );
}
