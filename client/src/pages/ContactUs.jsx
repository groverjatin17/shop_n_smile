import React, { lazy, Component } from "react";
import { ReactComponent as IconEnvelopeFill } from "bootstrap-icons/icons/envelope-fill.svg";
import { ReactComponent as IconHouseFill } from "bootstrap-icons/icons/house-fill.svg";
import { ReactComponent as IconTelephoneFill } from "bootstrap-icons/icons/telephone-fill.svg";
const ContactUsForm = lazy(() => import("../components/ContactUsForm"));

class ContactUsView extends Component {
  onSubmit = async (values) => {
    alert(JSON.stringify(values));
  };

  render() {
    return (
      <div className="container my-3">
        <div className="row g-3">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">
                <IconEnvelopeFill className="i-va" /> Send Message
              </div>
              <div className="card-body">
                <ContactUsForm onSubmit={this.onSubmit} />
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card mb-3">
              <div className="card-header">
                <IconHouseFill className="i-va" /> Address
              </div>
              <div className="card-body">
                <h6 className="card-title border-bottom border-dark pb-2">Head Office</h6>
                <address>
                  <strong>Shop and Smile, Inc.</strong>
                  <br />
                  1355 Connought Place
                  <br />
                  New Delhi, IN 94103
                  <br />
                  <IconTelephoneFill className="i-va" />{" "}
                  <abbr title="Phone">P:</abbr> (123) 456-7890
                </address>
                <h6 className="card-title border-bottom border-dark pb-2">Development Office</h6>
                <address>
                  <strong>Shop and Smile, Inc.</strong>
                  <br />
                  1234 Palika Bazar
                  <br />
                  Old Delhi, IN 94103
                  <br />
                  <IconTelephoneFill className="i-va" />{" "}
                  <abbr title="Phone">P:</abbr> (123) 456-7890
                </address>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ContactUsView;
