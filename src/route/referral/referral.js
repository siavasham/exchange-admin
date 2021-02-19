import React, { useState, useEffect } from "react";
import Breadcrumb from "component/breadcrumb";
import { t } from "locales";
import { post } from "library/request";
import Spinner from "component/spinner";
import InfoBox from "component/infobox";
import Clipboard from "react-clipboard.js";
import Alert from "react-bootstrap/Alert";
import useStorage from "reducer";

export default function () {
  const [referrals, setReferrals] = useState([]);
  const [copid, setCopid] = useState(false);
  const {
    setting: { name, token },
  } = useStorage();

  const address = window.location.origin + "/register?ref=" + name;
  const onCopy = () => {
    setCopid(true);
    setTimeout(() => {
      setCopid(false);
    }, 5000);
  };
  useEffect(() => {
    post("referrals", { token }, { cache: true }).then((res) => {
      if (res?.success) {
        setReferrals(res.success);
      }
    });
  }, []);
  return (
    <div>
      <Breadcrumb title="referral" icon="mdi-reply" />
      <InfoBox text={t("referralDesc")} />
      <div className="row">
        <div className="col-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title pb-3">{t("yourReferral")}</h4>
              <p className="card-description">{t("referralHelp")}</p>
              <div className="row">
                <div className="col-6">
                  <label>{t("refLink")}</label>
                  <div className="input-group">
                    <div className="input-group-prepend cursor-pointer">
                      <Clipboard
                        component="span"
                        data-clipboard-text={address}
                        onSuccess={onCopy}
                        className="input-group-text text-primary mdi mdi-content-copy"
                      ></Clipboard>
                    </div>
                    <input
                      value={address}
                      dir="auto"
                      type="text"
                      className="form-control form-control"
                    />
                  </div>
                </div>
                <div className="col-6">
                  <label>{t("refCode")}</label>
                  <div className="input-group">
                    <div className="input-group-prepend cursor-pointer">
                      <Clipboard
                        component="span"
                        data-clipboard-text={name}
                        onSuccess={onCopy}
                        className="input-group-text text-primary mdi mdi-content-copy"
                      ></Clipboard>
                    </div>
                    <input
                      value={name}
                      dir="auto"
                      type="text"
                      className="form-control form-control"
                    />
                  </div>
                </div>
              </div>
              <div className="inline-absolute center text-center">
                <Alert
                  variant="primary"
                  bsPrefix="alert alert-fill"
                  show={copid}
                >
                  {t("addressCopid")}
                </Alert>
              </div>
            </div>
          </div>
        </div>
      </div>
      {referrals && (
        <div className="row">
          <div className="col-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title pb-3">{t("yourRefers")}</h4>
                {referrals.map((ref, i) => (
                  <div class="row" key={i}>
                    <div class="col d-flex">
                      <div class="wrapper pl-3">
                        <p class="mb-0 font-weight-medium text-muted">
                          {t("userName")}
                        </p>
                        <h4 class="font-weight-semibold mb-0">
                          {ref.referral}
                        </h4>
                      </div>
                    </div>
                    <div class="col d-flex">
                      <div class="wrapper pl-3">
                        <p class="mb-0 font-weight-medium text-muted">
                          {t("invested")}
                        </p>
                        <label
                          className={
                            "badge " +
                            (ref.invested ? "badge-success" : "badge-danger")
                          }
                        >
                          {t(ref.invested ? "yes" : "no")}
                        </label>
                      </div>
                    </div>
                    <div class="col d-flex">
                      <div class="wrapper pl-3">
                        <p class="mb-0 font-weight-medium text-muted">
                          {t("profit")}
                        </p>
                        <h4 class="font-weight-semibold mb-0">
                          {t(ref.profit)}
                        </h4>
                      </div>
                    </div>
                    <div class="col d-flex">
                      <div class="wrapper pl-3">
                        <p class="mb-0 font-weight-medium text-muted">
                          {t("joinDate")}
                        </p>
                        <h4 class="font-weight-semibold mb-0 text-primary">
                          49.65%
                        </h4>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
