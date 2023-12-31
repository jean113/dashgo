import { Stack, Icon, Text, Box, Link } from "@chakra-ui/react";
import { ReactNode } from "react";
import { RiDashboardLine, RiContactsLine } from "react-icons/ri";

interface NavSectionProps
{
    title: string;
    children: ReactNode;
}

export default function NavSection({title, children} : NavSectionProps)
{
    return (
        <Box>
            <Text fontWeight="bold" color="gray.400" fontSize="small">{title}</Text>
            <Stack spacing="4" marginTop="8" align="stretch">
                {children}
            </Stack>
        </Box>
    )
} 