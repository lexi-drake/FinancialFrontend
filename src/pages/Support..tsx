import { push } from "connected-react-router";
import { useState } from "react";
import { connect } from "react-redux";
import Content from "../components/custom/Content";
import CustomButton from "../components/custom/CustomButton";
import CustomLongText from "../components/custom/CustomLongText";
import CustomText from "../components/custom/CustomText";
import Header from "../components/custom/Header"
import Section from "../components/custom/Section";
import { AppDataState } from "../store/appdata";
import { submitTicket } from "../store/user/actions";

interface SupportProps {
    submitTicket: typeof submitTicket;
    push: typeof push;
}

const Support = (props: SupportProps) => {
    const [processing, setProcessing] = useState(false);
    const [subject, setSubject] = useState('');
    const [content, setContent] = useState('');

    const submitDisabled = (): boolean => processing || !subject || !content;

    const onSubmitClick = async () => {
        setProcessing(true);
        await props.submitTicket({ subject, content });
        props.push('/dashboard');
    }

    return (
        <div className="support">
            <Header>
                <h1>Support</h1>
                <p>
                    Notice something wrong? Or is something not intuitive? Use this
                    form to submit feedback to the admins.
                </p>
            </Header>
            <Section>
                <Content>
                    <CustomText value={subject} label="Subject" onChange={(value) => setSubject(value)} />
                    <CustomLongText value={content} placeholder="What's on your mind?" onChange={(value) => setContent(value)} />
                </Content>
                <Content>
                    <CustomButton disabled={submitDisabled()} onClick={() => onSubmitClick()}>{processing ? 'Submitting' : 'Submit'}</CustomButton>
                </Content>
            </Section>
        </div>
    );
}

const mapStateToProps = (state: AppDataState): Partial<SupportProps> => {
    return {};
}

export default connect(mapStateToProps, { submitTicket, push })(Support as any);