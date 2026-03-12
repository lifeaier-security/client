import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

export default function MailVerify() {

    const apiUrl = process.env.REACT_APP_API_URL;

    const [loading, setLoading] = React.useState(true);
    const [status, setStatus] = React.useState("");

    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    React.useEffect(() => {

        if (!token) {
            setStatus("Баталгаажуулах холбоос буруу байна.");
            setLoading(false);
            return;
        }

        verify();

    }, [token]);

    const verify = async () => {

        try {
            const response = await fetch(`${apiUrl}/verify`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token })
            });

            if (response.ok) {
                setStatus("✅ Баталгаажуулалт амжилттай боллоо.");
                setTimeout(() => {
                    window.location.href = "/";
                }, 1500);
                return;
            }

            const data = await response.json();

            if (data.error === "MAIL_NOT_VERIFIED") {
                setStatus("❌ Баталгаажуулалт амжилтгүй боллоо. Имэйлээ шалгана уу.");
            } else {
                setStatus("❌ Баталгаажуулалт амжилтгүй боллоо.");
            }

        } catch (err) {
            setStatus("❌ Серверийн алдаа гарлаа. Дараа дахин оролдоно уу.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                height: "100vh",
                bgcolor: "#f5f5f5",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                p: 1
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    width: "100%",
                    maxWidth: 500,
                    p: 4,
                    borderRadius: 2,
                    textAlign: "center"
                }}
            >

                {loading ? (
                    <>
                        <CircularProgress />
                        <Typography mt={2}>
                            Имэйл баталгаажуулж байна...
                        </Typography>
                    </>
                ) : (
                    <Typography>
                        {status}
                    </Typography>
                )}

            </Paper>
        </Box>
    );
}